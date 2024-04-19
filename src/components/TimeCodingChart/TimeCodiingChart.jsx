import React, { useState, useEffect, useMemo } from "react"
import UiTimeControls from "../UiTimeControls/UiTimeControls"
import UiGroup from "../UiGroup/UiGroup"
import UiBarChart from "../UiBarChart/UiBarChart"
import axios from "axios"
import useSessionStorage from "../../hooks/useSessionStorage"

const orange = "#e78a4e"

const getDate = (datum) => datum.date
const getDuration = (datum) => datum.duration

const TimeCodingChart = ({ endpoint, reload }) => {
  const [data, setData] = useState(null)
  const [sessionStorage, setSessionStorage] = useSessionStorage(
    "code_metrics_time_coding",
    {}
  )
  const [timeRange, setTimeRange] = useState("last_7_days")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?timePeriod=${timeRange}`)
      const freshData = {
        ...sessionStorage,
        [timeRange]: response?.data?.data.map((d) => ({
          ...d,
          duration: parseFloat(d.duration),
        })),
      }

      setSessionStorage(freshData)

      setData(
        response?.data?.data.map((d) => ({
          ...d,
          duration: parseFloat(d.duration),
        }))
      )
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError("Coding highlights could not be fetched: " + err.message + ".")
    }
  }

  const handleTimeRangeChange = (time) => {
    setTimeRange(time)
  }

  const handleRefreshData = async () => {
    setSessionStorage({})
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

  useEffect(() => {
    handleRefreshData()
  }, [reload])

  return (
    <UiGroup
      title="Time coding"
      minHeight={350}
      controls={
        <UiTimeControls
          timeRange={timeRange}
          onRangeChange={handleTimeRangeChange}
        />
      }
    >
      <UiBarChart
        data={data}
        error={error}
        loading={loading}
        barColour={orange}
        timeRange={timeRange}
        xMetric="date"
        yMetric="duration"
        yUnit="hrs"
        getX={getDate}
        getY={getDuration}
      />

      {}
    </UiGroup>
  )
}

export default TimeCodingChart
