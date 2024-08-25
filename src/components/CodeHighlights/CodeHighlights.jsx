import React, { useState, useEffect } from "react"
import axios from "axios"
import UiTimeControls from "../UiTimeControls/UiTimeControls"
import UiScorecard from "../UiScorecard/UiScorecard"
import UiGroup from "../UiGroup/UiGroup"
import { unixSecondsToDay } from "../../helpers/unixSecondsToDay"

import useSessionStorage from "../../hooks/useSessionStorage"

const UiHighlights = ({ endpoint, reload }) => {
  const [data, setData] = useState({})
  const [timeRange, setTimeRange] = useState("last_30_days")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sessionStorage, setSessionStorage] = useSessionStorage(
    "code_metrics_highlights",
    {}
  )

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?timePeriod=${timeRange}`)
      const freshData = {
        ...sessionStorage,
        [timeRange]: response?.data?.data,
      }
      setSessionStorage(freshData)
      setData(response?.data?.data)
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
    <>
      <UiGroup
        child
        title="Highlights"
        controls={
          <UiTimeControls
            timeRange={timeRange}
            onRangeChange={handleTimeRangeChange}
            includeYear={true}
          />
        }
      >
        <UiScorecard
          label="Total time"
          metric={unixSecondsToDay(data?.total_seconds)}
          loading={loading}
          error={error}
        />
        <UiScorecard
          label="Daily Average"
          metric={data?.human_readable_daily_average}
          loading={loading}
          error={error}
        />
        <UiScorecard
          label="Longest day"
          metric={data?.best_day?.text}
          loading={loading}
          error={error}
        />
      </UiGroup>
    </>
  )
}

export default UiHighlights
