import React, { useState } from "react"
import Spinner from "react-bootstrap/Spinner"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import ButtonToolbar from "react-bootstrap/ButtonToolbar"
import Button from "react-bootstrap/Button"

const ChartControls = ({
  id,
  name,
  timeRange,
  loading,
  onChangeTimeRange,
  onRefreshData,
  controls,
  refreshable,
}) => {
  return (
    <ButtonToolbar>
      <ButtonGroup className="me-2">
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
            {loading && timeRange === control.value ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{" "}
                <span className="visually-hidden">{control.name}</span>
              </>
            ) : (
              control.name
            )}
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

{
  /* <ToggleButton type="radio" name="radio" value="week" variant="secondary" size="sm">
        Week
      </ToggleButton>
      <ToggleButton type="radio" name="radio" value="Month" variant="secondary" size="sm" checked>
        Month
      </ToggleButton>
      <ToggleButton type="radio" name="radio" value="Year" variant="secondary" size="sm">
        Year
      </ToggleButton> */
}
