import React from "react"
import "./UiHeader.scss"

const UiHeader = ({ title, controls }) => {
  return (
    <div className="UiHeader">
      <div className="UiHeader__title">{title}</div>
      <div className="UiHeader__controls">{controls}</div>
    </div>
  )
}

export default UiHeader
