import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"
import Chart from "../Chart/Chart"
import { Line } from "react-chartjs-2"
import ChartControls from "../ChartControls/ChartControls"
import useSessionStorage from "../../hooks/useSessionStorage"
import { options } from "./options"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const CodingDurationsChart = ({ endpoint }) => {
  const resourcePath = "time-coding"
  const [data, setData] = useState(null)
  const [sessionStorage, setSessionStorage] = useSessionStorage("code_metrics_time_coding", {})
  const [timeRange, setTimeRange] = useState("last_30_days")
  const [loading, setLoading] = useState(null)
  const labels = data?.map((datum) => datum?.date)
  const values = data?.map((datum) => datum?.duration)

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}/${resourcePath}?timePeriod=${timeRange}`)
      const freshData = { ...sessionStorage, [timeRange]: response?.data?.data }
      setSessionStorage(freshData)
      setData(response?.data?.data)
      setLoading(false)
    } catch (err) {
      // setError(err.message);
      // setLoading(false);
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

  const chartJsData = {
    labels,
    datasets: [
      {
        fill: true,
        data: values,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <Chart
      chartTitle="Time coding"
      chart={<Line height="300px" options={options} data={chartJsData} />}
      controls={
        <ChartControls
          loading={loading}
          timeRange={timeRange}
          onChangeTimeRange={handleTimeRangeChange}
          onRefreshData={handleRefreshData}
        />
      }
    />
  )
}

export default CodingDurationsChart
