import React, { useState, useEffect } from "react"
import axios from "axios"
import ProgrammingLanguagesChart from "../ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import OperatingSystemsChart from "../OperatingSystemsChart/OperatingSystemsChart"
import CodingDurationsChart from "../CodingDurationsChart/CodingDurationsChart"
import SingleMetrics from "../SingleMetrics/SingleMetrics"
import CodeMetricsControls from "../CodeMetricsControls/CodeMetricsControls"
import useSessionStorage from "../../hooks/useSessionStorage"
import "./CodeMetrics.scss"

const ENDPOINT = process.env.GATSBY_METRICS_AWS_LAMBDA_ENDPOINT

const CodeMetrics = () => {
  const [storedData, setStoredData] = useSessionStorage("so_code_metrics_wakatime", {})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [range, setRange] = useState("last_30_days")

  const handleRangeChange = (range) => {
    setLoading(true)
    setRange(range)
  }

  // Clear cache and update entry in sessionStorage for given time range
  const handleDataRefresh = async () => {
    // Remove the current range's data from the storedData
    const updatedStoredData = { ...storedData }
    delete updatedStoredData[range]
    setStoredData(updatedStoredData)

    // Refetch data for time range
    try {
      const response = await axios.get(`${ENDPOINT}?timePeriod=${range}`)
      const newData = { ...storedData, [range]: response?.data }
      setStoredData(newData)
      setData(response?.data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const cachedDataForRange = storedData[range]
      if (cachedDataForRange) {
        setData(cachedDataForRange)
        setLoading(false)
      } else {
        try {
          const response = await axios.get(`${ENDPOINT}?timePeriod=${range}`)
          const newData = { ...storedData, [range]: response?.data }
          setStoredData(newData)
          setData(response?.data)
          setLoading(false)
        } catch (err) {
          setError(err.message)
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [range, storedData, setStoredData])

  return (
    <div className="CodeMetrics">
      <CodeMetricsControls
        range={range}
        onChangeRange={handleRangeChange}
        disabled={loading}
        buttonAction={handleDataRefresh}
      />

      {loading ? (
        <div className="loading-line"></div>
      ) : error ? (
        <div className="error-wrapper">
          <span>An error occurred when retrieving WakaTime data: {error} </span>{" "}
        </div>
      ) : (
        <div className="CodeMetrics_wakatime-outputs">
          <div className="CodeMetrics__block">
            <h2>Time coding</h2>
            <SingleMetrics
              data={{
                total: data?.codingTimeTotal,
                dailyAverage: data?.codingTimeDailyAverage,
                bestDay: data?.codingTimeBestDay,
                totalToday: data?.codingTimeToday,
              }}
              loading={loading}
              error={error?.mainMetrics || error?.todayOnly}
            />
          </div>

          <div className="CodeMetrics__block">
            <CodingDurationsChart data={data?.codingDurations} />
          </div>
          <div className="CodeMetrics__block">
            <h2>Programming languages</h2>
            <ProgrammingLanguagesChart data={data?.programmingLanguages} loading={loading} />
          </div>
          <h2>Operating systems</h2>
          <OperatingSystemsChart data={data?.operatingSystems} loading={loading} />
        </div>
      )}
    </div>
  )
}

export default CodeMetrics
