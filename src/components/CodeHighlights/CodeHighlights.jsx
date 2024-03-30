import React, { useState, useEffect } from "react"
import axios from "axios"
import UiTimeControls from "../UiTimeControls/UiTimeControls"
import UiScorecard from "../UiScorecard/UiScorecard"
import UiGroup from "../UiGroup/UiGroup"
import { unixSecondsToDay } from "../../helpers/unixSecondsToDay"

const UiHighlights = ({ endpoint }) => {
  const [data, setData] = useState({})
  const [timeRange, setTimeRange] = useState("last_30_days")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?timePeriod=${timeRange}`)
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

  useEffect(() => {
    setLoading(true)
    fetchData(timeRange)
  }, [timeRange])

  return (
    <>
      <UiGroup
        title="Highlights"
        controls={
          <UiTimeControls
            timeRange={timeRange}
            onRangeChange={handleTimeRangeChange}
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
