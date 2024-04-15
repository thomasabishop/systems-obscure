import React from "react"

const UiStaticTooltip = ({ x, y }) => {
  return (
    <div className={`ui-static-tooltip ${x !== undefined ? "" : "visible"}`}>
      <div className="wrapper">
        <div>{x}</div>
        <div>{y}</div>
      </div>
    </div>
  )
}

export default UiStaticTooltip
