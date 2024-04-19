import React from "react"
import "./UiStaticTooltip.scss"

const UiStaticTooltip = ({ x, y }) => {
  return (
    <div
      className={`UiStaticTooltip ${
        x !== undefined ? "" : "UiStaticTooltip__visible"
      }`}
    >
      <div className="UiStaticTooltip__wrapper">
        <div>{x}</div>
        <div>{y}</div>
      </div>
    </div>
  )
}

export default UiStaticTooltip
