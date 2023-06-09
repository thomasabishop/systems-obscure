import React from "react"
import "./SelectInput.scss"

const SelectInput = () => {
  return (
    <div class="SelectInput">
      <select aria-label="Default select example">
        <option selected>Time range</option>
        <option value="1">Last seven days</option>
        <option value="2">Last thirty days</option>
        <option value="3">All time</option>
      </select>
    </div>
  )
}

export default SelectInput
