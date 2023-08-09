import React, { useState, useEffect } from "react"
import axios from "axios"
import ProgrammingLanguagesChart from "../ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import OperatingSystemsChart from "../OperatingSystemsChart/OperatingSystemsChart"
import CodingDurationsChart from "../CodingDurationsChart/CodingDurationsChart"
import SingleMetrics from "../SingleMetrics/SingleMetrics"
import CodeMetricsControls from "../CodeMetricsControls/CodeMetricsControls"
import "./CodeMetrics.scss"

const ENDPOINT = process.env.GATSBY_METRICS_AWS_LAMBDA_ENDPOINT

const CodeMetrics = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [range, setRange] = useState("last_30_days")

  const handleRangeChange = (range) => {
    setLoading(true)
    setRange(range)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ENDPOINT}?timePeriod=${range}`)
        setData(response?.data)
        // setData(res?.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [range])

  console.log(data)

  return (
    <div className="CodeMetrics">
      <p>
        The metrics are derived from the <a>WakaTime</a> and <a>GitHub</a> APIs. The data is cached
        client-side. Click 'Refresh' to see the latest data.
      </p>

      <CodeMetricsControls timePeriod={range} onChangeRange={handleRangeChange} />

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
    </div>
  )
}

export default CodeMetrics
