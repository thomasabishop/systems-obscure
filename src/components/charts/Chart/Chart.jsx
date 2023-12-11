import React from "react"
import "./Chart.scss"

const Chart = ({ chartTitle, chart, controls }) => {
  return (
    <div className="Chart mt-2">
      <div className="Chart__title">
        <h2>{chartTitle}</h2>
      </div>
      <div className="Chart__wrapper">
        <div className="Chart__controls">{controls}</div>
        <div className="Chart__content">{chart}</div>
      </div>
    </div>
  )
}

export default Chart
