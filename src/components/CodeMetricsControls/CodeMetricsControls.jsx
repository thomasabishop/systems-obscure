import React from "react"
import "./CodeMetricsControls.scss"
import Button from "../Button/Button"
import SelectInput from "../SelectInput/SelectInput"

const CodeMetricsControls = () => {
  return (
    <div className="CodeMetricsControls">
      <SelectInput />

      <Button buttonText="Refresh data" />
    </div>
  )
}

export default CodeMetricsControls
