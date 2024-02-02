import React from "react"
import {
  ButtonGroup,
  ToggleButton,
  ButtonToolbar,
  Button,
} from "react-bootstrap"
import "./ViewControls.scss"

const ViewControls = ({ controls, currentView, onViewChange }) => {
  return (
    <ButtonToolbar className="ViewControls">
      <ButtonGroup>
        {controls.map((control, index) => (
          <ToggleButton
            key={index}
            id={`${control.value}-${index}`}
            checked={control.value === currentView}
            onChange={(event) => onViewChange(event.target.value)}
            type="radio"
            value={control.value}
            variant="secondary"
            size="sm"
          >
            <i className={`bi bi-${control.iconName}`}></i>
          </ToggleButton>
        ))}
      </ButtonGroup>
    </ButtonToolbar>
  )
}

export default ViewControls
