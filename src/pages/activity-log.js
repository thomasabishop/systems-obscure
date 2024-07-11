import React, { useEffect, useState } from "react"
import axios from "axios"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import UiSelect from "../components/UiSelect/UiSelect"

const TIME_ENTRIES_ENDPOINT = process.env.GATSBY_TIME_ENTRIES_LAMBDA

const timeFilterOptions = [
  {
    value: "week",
    label: "Week",
  },
  {
    value: "fortnight",
    label: "Two weeks",
  },
  {
    value: "month",
    label: "Month",
  },

  {
    value: "year",
    label: "Year",
  },
]

// Next: add CORS to lambda

export default function ActivityLog() {
  const [timeRange, setTimeRange] = useState("week")
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log(timeRange)
    setLoading(true)
    fetchData(timeRange)
  }, [timeRange])

  const handleChange = (timeFilter) => {
    setTimeRange(timeFilter)
  }

  const fetchData = async (timeRange) => {
    try {
      console.log(TIME_ENTRIES_ENDPOINT)
      const response = await axios.get(
        `${TIME_ENTRIES_ENDPOINT}?period=${timeRange}`
      )
      setData(response?.data?.data)
      console.log(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError("Coding highlights could not be fetched: " + err.message + ".")
    }
  }

  return (
    <Main>
      <UiGroup
        title="Activity Log"
        controls={
          <UiSelect
            options={timeFilterOptions}
            values={timeRange}
            onChange={handleChange}
            name="activity-time-select"
          />
        }
      >
        <p>This dashboard lorem ipsum dolar sit avec amet.</p>
      </UiGroup>
    </Main>
  )
}
