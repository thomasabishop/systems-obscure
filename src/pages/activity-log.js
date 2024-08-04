import React, { useEffect, useState } from "react"
import axios from "axios"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import UiSelect from "../components/UiSelect/UiSelect"
import UiDataTable from "../components/UiDataTable/UiDataTable"
import { parseTimeEntries } from "../helpers/parseTimeEntries"
import useSessionStorage from "../hooks/useSessionStorage"

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

  // {
  //   value: "year",
  //   label: "Year",
  // },
]

export default function ActivityLog() {
  const [timeRange, setTimeRange] = useState({ value: "week", label: "Week" })
  const [sessionStorage, setSessionStorage] = useSessionStorage(
    "activity_log",
    {}
  )
  // const [data, setData] = useState({})
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const headers = ["Date", "Time", "Activity", "Duration", "Description"]

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(
        `${TIME_ENTRIES_ENDPOINT}?period=${timeRange.value}`
      )

      const processedData = parseTimeEntries(response?.data?.data)

      const freshData = {
        ...sessionStorage,
        [timeRange?.value]: processedData,
      }

      setSessionStorage(freshData)
      // setData(response?.data?.data)
      setTableData(processedData)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(
        `Error: Data could not be fetched for period '${timeRange.value}'`
      )
    }
  }

  useEffect(() => {
    setError(null)
    setLoading(true)
    const cachedData = sessionStorage[timeRange?.value]
    if (cachedData) {
      setTableData(cachedData)
      setLoading(false)
    } else {
      fetchData(timeRange)
    }
    // fetchData(timeRange)
  }, [timeRange, sessionStorage])

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
        <p>
          The data on this page records my main technical activities (outside of
          work). It uses{" "}
          <a href="https://timewarrior.net/docs/what/" target="_blank">
            TimeWarrior
          </a>{" "}
          logs uploaded on a cron schedule from my local machine to a DynamoDB
          table.
        </p>
        <UiDataTable
          key={timeRange.value}
          headers={headers}
          rows={tableData}
          loading={loading}
          error={error}
        />
      </UiGroup>
    </Main>
  )
}
