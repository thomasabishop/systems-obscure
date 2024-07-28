import React, { useEffect, useState } from "react"
import axios from "axios"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import UiSelect from "../components/UiSelect/UiSelect"
import UiDataTable from "../components/UiDataTable/UiDataTable"
import { parseTimeEntries } from "../helpers/parseTimeEntries"
const TIME_ENTRIES_ENDPOINT = process.env.GATSBY_TIME_ENTRIES_LAMBDA

const timeFilterOptions = [
  {
    value: "week",
    label: "Week",
  },
  {
    value: "fortnight",
    label: "Fortnight",
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

export default function ActivityLog() {
  const [timeRange, setTimeRange] = useState({ value: "week", label: "Week" })
  const [data, setData] = useState({})
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const headers = ["Date", "Time", "Activity", "Duration", "Description"]

  useEffect(() => {
    setLoading(true)
    fetchData(timeRange)
    //    console.log(data)
  }, [timeRange])

  const fetchData = async (timeRange) => {
    try {
      console.log(TIME_ENTRIES_ENDPOINT)
      const response = await axios.get(
        `${TIME_ENTRIES_ENDPOINT}?period=${timeRange.value}`
      )
      setData(response?.data?.data)
      setTableData(parseTimeEntries(response?.data?.data))
      //      console.log(tableData)
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
            defaultValue={timeRange}
            options={timeFilterOptions}
            values={timeRange}
            onChange={setTimeRange}
            name="activity-time-select"
          />
        }
      >
        <UiDataTable
          headers={headers}
          rows={tableData}
          loading={loading}
          key={timeRange.value}
        />
      </UiGroup>
    </Main>
  )
}
