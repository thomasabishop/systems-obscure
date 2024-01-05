import React, { useEffect, useState } from "react"
import axios from "axios"
import MetricsView from "../MetricsView/MetricsView"
import ViewControls from "../ViewControls/ViewControls"
import ActivitiesTable from "../ActivitiesTable/ActivitiesTable"
import ActivitiesChart from "../ActivitiesChart/ActivitiesChart"
import useSessionStorage from "../../hooks/useSessionStorage"

const activityColours = {
  Projects: ["rgba(54, 162, 235, 0.3)", "rgba(54, 162, 235, 1)"],
  Blogging: ["rgba(255, 99, 132, 0.3)", "rgba(255, 99, 132, 1)"],
  "Practical study": ["rgba(255, 206, 86, 0.3)", "rgba(255, 206, 86, 1)"],
  "Code exercises": ["rgba(153, 102, 255, 0.3)", "rgba(153, 102, 255, 1)"],
  "Technical articles and podcasts": ["rgba(75, 192, 192, 0.3)", "rgba(75, 192, 192, 1)"],
  "Theoretical study": ["rgba(235, 123, 54, 0.3)", "rgba(235, 123, 54, 1)"],
}

const ActivitiesView = ({ endpoint, onError }) => {
  const [currentView, setCurrentView] = useState("chart")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(null)
  const [timeRange, setTimeRange] = useState("month")
  const [sessionStorage, setSessionStorage] = useSessionStorage("code_metrics_activities", {})

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  const handleTimeRangeChange = (timeRange) => {
    setTimeRange(timeRange)
  }

  const viewControls = [
    {
      value: "chart",
      iconName: "bar-chart",
    },
    {
      value: "table",
      iconName: "table",
    },
  ]

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?date_range=${timeRange}`)
      const freshData = { ...sessionStorage, [timeRange]: response?.data?.data }
      setSessionStorage(freshData)
      setData(response?.data?.data)
      setLoading(false)
    } catch (err) {
      onError("Activity data could not be sourced: " + err.message)
      setLoading(false)
    }
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
  }, [timeRange, sessionStorage])

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
        currentView === "chart" ? (
          <ActivitiesChart
            data={data}
            colours={activityColours}
            loading={loading}
            timeRange={timeRange}
            onChangeTimeRange={handleTimeRangeChange}
            onRefreshData={handleRefreshData}
          />
        ) : (
          <ActivitiesTable data={data} colours={activityColours} />
        )
      }
    />
  )
}

export default ActivitiesView
