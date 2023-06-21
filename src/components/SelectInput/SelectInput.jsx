import React from "react"
import { debounce } from "lodash"
import "./SelectInput.scss"

const SelectInput = ({ timePeriod, onChangeTimePeriod }) => {
  const debouncedChange = debounce(onChangeTimePeriod, 300)
  const handleChange = (event) => {
    debouncedChange(event.target.value)
  }

  return (
    <form className="SelectInput">
      <select value={timePeriod} onChange={handleChange} aria-label="Default select example">
        <option value="this_week">This week</option>
        <option value="last_7_days">Last seven days</option>
        <option value="last_two_weeks">Last two weeks</option>
        <option value="this_month">This month</option>
        <option value="last_thirty_days">Last thirty days</option>
        <option value="last_six_months">Last six months</option>
        <option value="this_year">This year</option>
        <option value="last_twelve_months">Last twelve months</option>
        <option value="all_time">All time</option>
      </select>
    </form>
  )
}

export default SelectInput
