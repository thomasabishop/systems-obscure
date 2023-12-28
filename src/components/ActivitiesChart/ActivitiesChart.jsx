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
import { createActivityDatasets } from "../../helpers/createActivityDatasets"
import ActivitiesTable from "../ActivitiesTable/ActivitiesTable"

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

  const { labels, datasets } = createActivityDatasets(data, chartColours)

  const chartData = {
    labels: labels,
    datasets,
  }

  const viewControls = [
    {
      value: "barChart",
      iconName: "bar-chart",
    },
    {
      value: "table",
      iconName: "table",
    },
  ]

  console.log(data)

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
          <ActivitiesTable data={data} chartColours={chartColours} />
        )
      }
    />
  )
}

export default ActivitiesChart
