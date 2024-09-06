import React from "react"
import "./ChartTooltip.scss"

const TooltipData = ({ data }) => {
  return (
    <div>
      <span style={{ display: "inline-block", marginRight: "0.5rem" }}>
        {data[0]}
      </span>
      <span>{`${data[1]} hrs`}</span>
    </div>
  )
}

const ChartTooltip = ({ data, x, y }) => {
  return (
    <div className={`ChartTooltip`}>
      <div className="tooltip-content">
        <div></div>
        <div>
          {data[x] ? (
            <TooltipData data={[data[x], data[y]]} />
          ) : (
            <span>Select bar to view data</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChartTooltip
