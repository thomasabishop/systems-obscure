import React, { useState, useEffect, useMemo } from "react"
import UiTimeControls from "../UiTimeControls/UiTimeControls"
import UiGroup from "../UiGroup/UiGroup"
import UiBarChart from "../UiBarChart/UiBarChart"
import axios from "axios"
import useSessionStorage from "../../hooks/useSessionStorage"

const orange = "#e78a4e"

const ProgLangChart = ({ endpoint, reload }) => {
  const [data, setData] = useState(null)
  const [sessionStorage, setSessionStorage] = useSessionStorage(
    "code_metrics_programming_languages",
    {}
  )
  const [timeRange, setTimeRange] = useState("last_7_days")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?timePeriod=${timeRange}`)
      const languages = response?.data?.data?.languages

      const parsed = languages.map((lang) => ({
        language: lang.name,
        percent: lang.percent,
      }))

      setData(parsed)
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
    handleRefreshData()
  }, [reload])

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
    <UiGroup
      title="Programming Languages"
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
      />

      {}
    </UiGroup>
  )
}

export default ProgLangChart
