import React, { useState, useEffect } from "react"
import axios from "axios"
import Main from "../../templates/main/Main"
import ProgrammingLanguagesChart from "../ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import OperatingSystemsChart from "../OperatingSystemsChart/OperatingSystemsChart"
import CodingDurationsChart from "../CodingDurationsChart/CodingDurationsChart"
import SingleMetrics from "../SingleMetrics/SingleMetrics"
import CodeMetricsControls from "../CodeMetricsControls/CodeMetricsControls"
import "./CodeMetrics.scss"

const basePath = "http://127.0.0.1:3000/query-wakatime"

const getApiEndpoint = (deployment, endpoint, timePeriod) => {
  switch (deployment) {
    case "local":
      return `${basePath}/${endpoint}?timePeriod=${timePeriod}`
  }
}

const CodeMetrics = () => {
  const [data, setData] = useState({ mainMetrics: {}, durations: [], todayOnly: {} })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // const [parentState, setParentState] = useState("option_one")

  const [timePeriod, setTimePeriod] = useState("this_week")

  const handleTimePeriodChange = (timePeriod) => {
    setTimePeriod(timePeriod)
  }

  console.log(timePeriod)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp1 = await axios(getApiEndpoint("local", "main-metrics", "last_30_days"))
        const resp2 = await axios(getApiEndpoint("local", "durations", "last_30_days"))
        const resp3 = await axios(getApiEndpoint("local", "today-only"))
        setData({
          mainMetrics: resp1?.data?.data,
          durations: resp2?.data?.data,
          todayOnly: resp3?.data?.data,
        })
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const singleMetricData = {
    total: data?.mainMetrics?.human_readable_total,
    dailyAverage: data?.mainMetrics?.human_readable_daily_average,
    bestDay: data?.mainMetrics?.best_day?.text,
    totalToday: data?.todayOnly?.grand_total?.text,
  }

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
        <div className="CodeMetrics__block">
          <CodeMetricsControls
            timePeriod={timePeriod}
            onChangeTimePeriod={handleTimePeriodChange}
          />
        </div>

        <div className="CodeMetrics__block">
          <SingleMetrics data={singleMetricData} />
        </div>

        <h3>Time coding</h3>
        <CodingDurationsChart data={data?.durations} loading={loading} error={error} />

        <div className="CodeMetrics__block">
          <h3>Programming languages</h3>
          <ProgrammingLanguagesChart
            data={data?.mainMetrics?.languages}
            loading={loading}
            error={error}
          />
        </div>
        <h3>Operating systems</h3>
        <OperatingSystemsChart
          data={data?.mainMetrics?.operating_systems}
          loading={loading}
          error={error}
        />
      </div>
    </Main>
  )
}

export default CodeMetrics
