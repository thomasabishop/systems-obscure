import React from "react"
import { Button } from "react-bootstrap"
import "./IconButton.scss"

const IconButton = ({ iconName, tooltipText, action, isActive }) => {
  const classes = `bi bi-${iconName}`
  const handleClick = () => {
    action()
  }

  return (
    <Button
      className="IconButton"
      variant="outline-secondary"
      size="sm"
      onClick={handleClick}
      active={isActive}
      title={tooltipText}
    >
      <i className={classes}></i>
    </Button>
  )
}

export default IconButton
