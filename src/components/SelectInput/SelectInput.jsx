import React from "react"
import { debounce } from "lodash"
import "./SelectInput.scss"

const SelectInput = ({ range, onChangeRange }) => {
  const debouncedChange = debounce(onChangeRange, 300)
  const handleChange = (event) => {
    debouncedChange(event.target.value)
  }

  return (
    <form className="SelectInput">
      <select value={range} onChange={handleChange} aria-label="Default select example">
        <option value="last_7_days">Last week</option>
        <option value="last_30_days">Last month</option>
        <option value="last_6_months">Last six months</option>
        <option value="last_year">Last year</option>
      </select>
    </form>
  )
}

export default SelectInput
