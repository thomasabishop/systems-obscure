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
  const [storedData, setStoredData] = useSessionStorage("code_metrics_wakatime", {})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
      <p>
        Use the dropdown to change the time range. The data is cached. Click 'Refresh' to see the
        latest data.
      </p>

      <CodeMetricsControls
        range={range}
        onChangeRange={handleRangeChange}
        disabled={loading}
        buttonAction={handleDataRefresh}
      />

      {error ? (
        <div className="error-wrapper">
          <span>An error occurred when retrieving WakaTime data: {error} </span>{" "}
        </div>
      ) : (
        <div className="CodeMetrics_wakatime-outputs">
          <div className="CodeMetrics__block">
            <h3>Time coding</h3>
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

          <CodingDurationsChart data={data?.codingDurations} loading={loading} />

          <div className="CodeMetrics__block">
            <h3>Programming languages</h3>
            <ProgrammingLanguagesChart data={data?.programmingLanguages} loading={loading} />
          </div>
          <h3>Operating systems</h3>
          <OperatingSystemsChart data={data?.operatingSystems} loading={loading} />
        </div>
      )}

      <p style={{ fontSize: "0.875rem", textAlign: "center" }}>
        The metrics are derived from the <a>WakaTime</a> API.
      </p>
    </div>
  )
}

export default CodeMetrics
