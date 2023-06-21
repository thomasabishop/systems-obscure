import React from "react"
import "./CodeMetricsControls.scss"
import Button from "../Button/Button"
import SelectInput from "../SelectInput/SelectInput"

const CodeMetricsControls = ({ timePeriod, onChangeTimePeriod }) => {
  return (
    <div className="CodeMetricsControls">
      <SelectInput timePeriod={timePeriod} onChangeTimePeriod={onChangeTimePeriod} />
      <Button buttonText="Refresh" />
    </div>
  )
}

export default CodeMetricsControls
