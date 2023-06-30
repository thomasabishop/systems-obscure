import React, { useState, useEffect } from "react"
import axios from "axios"
import Main from "../../templates/main/Main"
import ProgrammingLanguagesChart from "../ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import OperatingSystemsChart from "../OperatingSystemsChart/OperatingSystemsChart"
import CodingDurationsChart from "../CodingDurationsChart/CodingDurationsChart"
import SingleMetrics from "../SingleMetrics/SingleMetrics"
import CodeMetricsControls from "../CodeMetricsControls/CodeMetricsControls"
import generateDateParameters from "./helpers/generateDateParameters"
import getApiEndpoint from "./helpers/getApiEndpoint"

import "./CodeMetrics.scss"

const CodeMetrics = () => {
  const basePath = {
    local: "http://127.0.0.1:3000/query-wakatime/main-metrics?timePeriod=",
    prod: undefined,
  }

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [timePeriod, setTimePeriod] = useState("last_30_days")

  const handleTimePeriodChange = (timePeriod) => {
    setLoading(true)
    setTimePeriod(timePeriod)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(basePath.local + timePeriod)
        setData(res?.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [timePeriod])

  console.log(data)

  return (
    <Main>
      <div className="CodeMetrics">
        <div className="CodeMetrics__header">
          <h1 className="CodeMetrics__title">Code Metrics</h1>
        </div>
        <p>
          The metrics are derived from the <a>WakaTime</a> and <a>GitHub</a> APIs. The data is
          cached client-side. Click 'Refresh' to see the latest data.
        </p>

        <CodeMetricsControls timePeriod={timePeriod} onChangeTimePeriod={handleTimePeriodChange} />

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
    </Main>
  )
}

export default CodeMetrics
