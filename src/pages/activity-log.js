import React, { useEffect, useState } from "react"
import axios from "axios"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import UiSelect from "../components/UiSelect/UiSelect"
import UiDataTable from "../components/UiDataTable/UiDataTable"
import { parseTimeEntries } from "../helpers/parseTimeEntries"
import useSessionStorage from "../hooks/useSessionStorage"
import ActivityPictograph from "../components/ActivityPictograph/ActivityPictograph"
import { dateToBritFormat } from "../components/ActivityPictograph/lib"
const TIME_ENTRIES_ENDPOINT = process.env.GATSBY_TIME_ENTRIES_LAMBDA

const MONTH = `${TIME_ENTRIES_ENDPOINT}/month`
const COUNT = `${TIME_ENTRIES_ENDPOINT}/count`
const DATE = `${TIME_ENTRIES_ENDPOINT}/date`

export default function ActivityLog() {
  const [monthCache, setMonthCache] = useSessionStorage(
    "activity_log_month",
    {}
  )

  const [countCache, setCountCache] = useSessionStorage(
    "activity_log_count",
    {}
  )

  const today = dateToBritFormat(new Date())

  const [countData, setCountData] = useState([])
  const [tableData, setTableData] = useState([])
  const [selectedDay, setSelectedDay] = useState(dateToBritFormat(today))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const headers = ["Date", "Time", "Activity", "Duration", "Description"]

  const fetchEntryCount = async () => {
    if (countCache.length) {
      setCountData(countCache)
      return
    }

    try {
      const response = await axios.get(COUNT)
      const countData = response?.data?.data
      setCountData(countData)
      setCountCache(countData)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError("Error: Data could not be fetched for individual days.")
    }
  }

  const fetchMonthData = async () => {
    if (monthCache.length) {
      setTableData(monthCache)
      return
    }

    try {
      const response = await axios.get(MONTH)
      const processed = parseTimeEntries(response?.data?.data)
      setMonthCache(processed)
      setTableData(processed)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(`Error: Data could not be fetched for month`)
    }
  }

  const fetchEntriesForDate = async (day) => {
    try {
      setLoading(true)
      const response = await axios.get(`${DATE}?date=${day}`)
      const processed = parseTimeEntries(response?.data?.data)
      setTableData(processed)
      setLoading(false)
    } catch (err) {
      setError("Error: Data could not be fetched for selected day")
      setTableData([])
    } finally {
      setLoading(false)
    }
  }

  const handleDaySelect = async (day) => {
    setError(null)
    setWarning(null)
    setSelectedDay(dateToBritFormat(day))
    await fetchEntriesForDate(day)
  }

  const handleEmptyDaySelect = (day) => {
    setTableData([])
    setWarning(`No entries for date ${day}`)
  }

  const handleReset = () => {
    setSelectedDay(today)
    fetchMonthData()
  }

  useEffect(() => {
    setError(null)
    setLoading(true)

    Promise.all([fetchMonthData(), fetchEntryCount()])
      .then(() => setLoading(false))
      .catch((err) => {
        setError("Error: Failed to fetch data")
        setLoading(false)
      })
  }, [])

  return (
    <Main>
      <UiGroup title="Activity Log">
        <p>
          The data on this page records my main technical activities (outside of
          work). It uses{" "}
          <a href="https://timewarrior.net/docs/what/" target="_blank">
            TimeWarrior
          </a>{" "}
          logs uploaded on a cron schedule from my local machine to a DynamoDB
          table.
        </p>
        <ActivityPictograph
          handleDaySelect={handleDaySelect}
          handleEmptyDaySelect={handleEmptyDaySelect}
          handleReset={handleReset}
          entryCount={countData}
          selectedDay={selectedDay}
        />
        <UiDataTable
          headers={headers}
          rows={tableData}
          loading={loading}
          error={error}
          warning={warning}
        />
      </UiGroup>
    </Main>
  )
}
