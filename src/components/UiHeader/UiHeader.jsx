import React from "react"
import "./UiHeader.scss"

const UiHeader = ({ title, icon, controls }) => {
  return (
    <div className="UiHeader">
      <div className="UiHeader__title">
        <div></div>
        <span>{title}</span>
      </div>
      <div className="UiHeader__controls">{controls}</div>
    </div>
  )
}

export default UiHeader
