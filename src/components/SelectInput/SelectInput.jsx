import React from "react"
import { debounce } from "lodash"
import "./SelectInput.scss"

const SelectInput = ({ range, onChangeRange, disabled }) => {
  const debouncedChange = debounce(onChangeRange, 300)
  const handleChange = (event) => {
    debouncedChange(event.target.value)
  }

  return (
    <select value={range} onChange={handleChange} disabled={disabled}>
      <option value="last_7_days">Last week</option>
      <option value="last_30_days">Last month</option>
      <option value="last_6_months">Last six months</option>
      <option value="last_year">Last year</option>
    </select>
  )
}

export default SelectInput
