import React, { useState, useEffect } from "react"
import axios from "axios"
import Main from "../templates/main/Main"
import ProgrammingLanguagesChart from "../components/ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import OperatingSystemsChart from "../components/OperatingSystemsChart/OperatingSystemsChart"
import CodingDurationsChart from "../components/CodingDurationsChart/CodingDurationsChart"
import SingleMetrics from "../components/SingleMetrics/SingleMetrics"
import CodeMetricsControls from "../components/CodeMetricsControls/CodeMetricsControls"

const basePath = "http://127.0.0.1:3000/query-wakatime"

const getApiEndpoint = (deployment, endpoint, timePeriod) => {
  switch (deployment) {
    case "local":
      return `${basePath}/${endpoint}?timePeriod=${timePeriod}`
  }
}

export default function CodeMetrics() {
  const [data, setData] = useState({ mainMetrics: {}, durations: {} })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp1 = await axios(getApiEndpoint("local", "main-metrics", "last_30_days"))
        const resp2 = await axios(getApiEndpoint("local", "durations", "last_30_days"))
        setData({ mainMetrics: resp1?.data?.data, durations: resp2?.data?.data })
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Main>
      <div className="code-metrics">
        <div className="code-metrics__header">
          <h1 className="code-metrics__title">Code Metrics</h1>
        </div>
        <p>
          The metrics are derived from the <a>WakaTime</a> and <a>GitHub</a> APIs. The data is
          cached client-side. Click 'Refresh' to see the latest data.
        </p>
        <div className="code-metrics__block">
          <CodeMetricsControls />
        </div>

        <div className="code-metrics__block">
          <SingleMetrics data={data?.mainMetrics} />
        </div>

        <h3>Programming languages</h3>
        <ProgrammingLanguagesChart
          data={data?.mainMetrics?.languages}
          loading={loading}
          error={error}
        />

        <h3>Operating systems</h3>
        <OperatingSystemsChart
          data={data?.mainMetrics?.operating_systems}
          loading={loading}
          error={error}
        />

        <h3>Time coding</h3>
        <CodingDurationsChart />
      </div>
    </Main>
  )
}
