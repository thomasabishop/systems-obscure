import React, { useState } from "react"
import { ButtonGroup, ToggleButton, ButtonToolbar, Button } from "react-bootstrap"

const ChartControls = ({
  id,
  timeRange,
  loading,
  onChangeTimeRange,
  onRefreshData,
  controls,
  refreshable,
}) => {
  return (
    <ButtonToolbar>
      <ButtonGroup className={`${refreshable ? "me-2" : ""}`}>
        {controls.map((control, index) => (
          <ToggleButton
            key={index}
            id={`${id}-${control.name}-${index}`}
            checked={timeRange === control.value}
            onChange={(event) => onChangeTimeRange(event.target.value)}
            type="radio"
            value={control.value}
            variant="secondary"
            size="sm"
          >
            {control.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {refreshable && (
        <ButtonGroup>
          <Button disabled={loading} size="sm" variant="primary" onClick={onRefreshData}>
            Refresh
          </Button>
        </ButtonGroup>
      )}
    </ButtonToolbar>
  )
}

export default ChartControls
