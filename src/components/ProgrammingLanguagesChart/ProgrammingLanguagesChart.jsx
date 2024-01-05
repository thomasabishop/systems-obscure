import React, { useState, useEffect } from "react"
import axios from "axios"
import Chart from "../Chart/Chart"
import ChartControls from "../ChartControls/ChartControls"
import { options } from "./options"
import useSessionStorage from "../../hooks/useSessionStorage"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import MetricsView from "../MetricsView/MetricsView"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ProgrammingLanguagesChart = ({ endpoint, onError }) => {
  const resourcePath = "stats"
  const [data, setData] = useState(null)
  const [sessionStorage, setSessionStorage] = useSessionStorage(
    "code_metrics_programming_languages",
    {}
  )

  const [timeRange, setTimeRange] = useState("last_30_days")
  const [loading, setLoading] = useState(null)

  const nonZeroValues = data?.filter((datum) => Number(datum?.decimal) > 0.1)
  const labels = nonZeroValues?.map((value) => value?.name)
  const values = nonZeroValues?.map((value) => value?.decimal)

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}/${resourcePath}?timePeriod=${timeRange}`)
      const freshData = { ...sessionStorage, [timeRange]: response?.data?.data?.languages }
      setSessionStorage(freshData)
      setData(response?.data?.data?.languages)
      setLoading(false)
    } catch (err) {
      onError("Programming languages data could not be sourced: " + err.message)
      setLoading(false)
    }
  }

  const handleTimeRangeChange = (timeRange) => {
    setTimeRange(timeRange)
  }

  const handleRefreshData = async () => {
    const storedData = { ...sessionStorage }
    delete storedData[timeRange]
    setSessionStorage(storedData)
  }

  useEffect(() => {
    setLoading(true)
    const cachedData = sessionStorage[timeRange]
    if (cachedData) {
      setData(cachedData)
      setLoading(false)
    } else {
      fetchData(timeRange)
    }
  }, [timeRange, sessionStorage, setSessionStorage])

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
      },
    ],
  }

  const chartControls = [
    {
      name: "Week",
      value: "last_7_days",
    },
    {
      name: "Month",
      value: "last_30_days",
    },
    {
      name: "Year",
      value: "last_year",
    },
  ]

  return (
    <MetricsView
      metricName="Programming languages"
      metricView={
        <Chart
          chart={<Bar height="400px" data={chartData} options={options} />}
          controls={
            <ChartControls
              id="programming-languages-controls"
              loading={loading}
              timeRange={timeRange}
              onChangeTimeRange={handleTimeRangeChange}
              controls={chartControls}
              refreshable={true}
              onRefreshData={handleRefreshData}
            />
          }
        />
      }
    />
  )
}

export default ProgrammingLanguagesChart
