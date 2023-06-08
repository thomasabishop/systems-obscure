import React, { useState, useEffect } from "react"

import axios from "axios"
import Main from "../templates/main/Main"
import ProgrammingLanguagesChart from "../components/ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import OperatingSystemsChart from "../components/OperatingSystemsChart/OperatingSystemsChart"
import SingleMetricDisplay from "../components/SingleMetricDisplay/SingleMetricDisplay"
import CodingDurationsChart from "../components/CodingDurationsChart/CodingDurationsChart"
import SingleMetrics from "../components/SingleMetrics/SingleMetrics"
const localEndpoiint = `http://127.0.0.1:3000/query-wakatime/main-metrics?timePeriod=last_30_days`

export default function CodeMetrics() {
  const [responseData, setResponseData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log(responseData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(localEndpoiint)
        setResponseData(response?.data?.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty array indicates this hook runs once on mount.

  const singleMetrics = [
    {
      title: "Total",
      value: responseData?.human_readable_total,
    },
    {
      title: "Daily average",
      value: responseData?.human_readable_daily_average,
    },
    {
      title: "Best single day",
      value: responseData?.best_day?.text,
    },
  ]

  return (
    <Main>
      <div className="code-metrics">
        <div className="code-metrics__header">
          <h2>Code Metrics</h2>
          <button className="code-metrics__refresh-btn">Refresh data</button>
        </div>

        {/* {loading && <p>Loading...</p>}
        {error && <p>An error occurred: {error} </p>} */}

        <SingleMetrics data={responseData} />

        {/* <div className="code-metrics__single-metrics">
          {singleMetrics.map((metric) => (
            <SingleMetricDisplay title={metric?.title} value={metric?.value} />
          ))}
        </div> */}

        <CodingDurationsChart />
        <ProgrammingLanguagesChart data={responseData?.languages} loading={loading} error={error} />
        <OperatingSystemsChart
          data={responseData?.operating_systems}
          loading={loading}
          error={error}
        />
      </div>
    </Main>
  )
}
