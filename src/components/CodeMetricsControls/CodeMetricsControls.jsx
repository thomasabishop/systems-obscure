import React from "react"
import "./CodeMetricsControls.scss"
import Button from "../Button/Button"
import SelectInput from "../SelectInput/SelectInput"

const CodeMetricsControls = ({ range, onChangeRange, buttonAction, buttonDisabled }) => {
  const testFunc = () => {
    console.log("test function click")
  }
  return (
    <div className="CodeMetricsControls">
      <SelectInput range={range} onChangeRange={onChangeRange} />
      <Button buttonText="Refresh" action={buttonAction} disabled={buttonDisabled} />
    </div>
  )
}

export default CodeMetricsControls
