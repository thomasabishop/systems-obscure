import React from "react"
import "./CodeMetricsControls.scss"
import Button from "../Button/Button"
import SelectInput from "../SelectInput/SelectInput"

const CodeMetricsControls = ({ range, onChangeRange, buttonAction, disabled }) => {
  return (
    <div className="CodeMetricsControls">
      <span>Time range: </span>
      <SelectInput range={range} onChangeRange={onChangeRange} disabled={disabled} />
      <Button buttonText="Refresh data" action={buttonAction} disabled={disabled} />
    </div>
  )
}

export default CodeMetricsControls
