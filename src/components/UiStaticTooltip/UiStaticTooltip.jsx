import React from "react"
import "./UiStaticTooltip.scss"

const UiStaticTooltip = ({ x, y, conditionalStyles }) => {
  return (
    <div
      className={`UiStaticTooltip ${
        x !== undefined ? "" : "UiStaticTooltip__visible"
      } ${conditionalStyles}`}
    >
      <div className="UiStaticTooltip__wrapper">
        <div>{x}</div>

        {y && <div>{y}</div>}
      </div>
    </div>
  )
}

export default UiStaticTooltip
