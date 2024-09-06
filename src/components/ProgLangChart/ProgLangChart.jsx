import React, { useState, useEffect, useMemo } from "react"
import UiTimeControls from "../UiTimeControls/UiTimeControls"
import UiGroup from "../UiGroup/UiGroup"
import UiBarChart from "../UiBarChart/UiBarChart"
import axios from "axios"
import useSessionStorage from "../../hooks/useSessionStorage"

const orange = "#e78a4e"
const red = "#ea6962"
const blue = "#7daea3"
const aqua = "#8dc07c"

const getLanguage = (datum) => datum.language
const getPercent = (datum) => datum.percent

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

      let parsed = languages
        .filter((lang) => lang.percent > 0.5)
        .map((lang) => ({
          language: lang.name,
          percent: lang.percent,
        }))

      setSessionStorage({
        ...sessionStorage,
        [timeRange]: parsed,
      })

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
      title="Programming languages"
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
        xMetric="language"
        yMetric="percent"
        yUnit="%"
        getX={getLanguage}
        getY={getPercent}
        chartId="programming-languages-chart"
      />

      {}
    </UiGroup>
  )
}

export default ProgLangChart
