import React, { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import Chart from "../Chart/Chart"
import axios from "axios"
import { options } from "./options"
import { chartColours } from "./chartColours"
import ViewControls from "../ViewControls/ViewControls"
import MetricsView from "../MetricsView/MetricsView"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ActivitiesChart = ({ endpoint }) => {
  const [currentView, setCurrentView] = useState("barChart")
  const [data, setData] = useState([])
  const [timeRange, setTimeRange] = useState("month")

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?date_range=${timeRange}`)
      setData(response?.data?.data)
    } catch (err) {
      // setError(err.message)
      // setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(timeRange)
  }, [])

  const uniqueDates = new Set(data.map((item) => item.date))
  const labels = [...uniqueDates]

  const datasets = data.reduce((acc, obj, i) => {
    let newDuration = Number(
      (
        parseFloat(obj.duration) +
        (acc.find((item) => item.label === obj.project)?.data[labels.indexOf(obj.date)] || 0)
      ).toFixed(2)
    )
    let index = acc.findIndex((item) => item.label === obj.project)
    if (index === -1) {
      let newData = new Array(labels.length).fill(0)
      newData[labels.indexOf(obj.date)] = newDuration
      acc.push({
        label: obj.project,
        data: newData,
        backgroundColor: chartColours[obj.project][0],
        borderColor: chartColours[obj.project][1],
        borderWidth: 1,
      })
    } else {
      acc[index].data[labels.indexOf(obj.date)] = newDuration
    }
    return acc
  }, [])

  const chartData = {
    labels: labels, // Change this if you want different labels
    datasets,
  }

  const viewControls = [
    {
      name: "bar-chart",
      value: "barChart",
      iconName: "bar-chart",
    },
    {
      name: "table",
      value: "table",
      iconName: "table",
    },
  ]

  return (
    <MetricsView
      metricName="Activities"
      viewControls={
        <ViewControls
          controls={viewControls}
          currentView={currentView}
          onViewChange={handleViewChange}
        />
      }
      metricView={
        currentView === "barChart" ? (
          <Chart
            chart={<Bar height="400px" options={options} data={chartData} />}
            controls={null}
          />
        ) : (
          <div>other content</div>
        )
      }
    />
  )
}

export default ActivitiesChart
