import React from "react"
import "./PictographTooltip.scss"

const PictographTooltip = ({ x, y, conditionalStyles }) => {
  return (
    <div
      className={`PictographTooltip ${
        x !== undefined ? "" : "PictographTooltip__visible"
      } ${conditionalStyles}`}
    >
      <div className="PictographTooltip__wrapper">
        <div>{x}</div>

        {y && <div>{y}</div>}
      </div>
    </div>
  )
}

export default PictographTooltip
