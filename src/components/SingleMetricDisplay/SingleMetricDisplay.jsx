import React from "react"
import "./SingleMetricDisplay.scss"

const SingleMetricDisplay = ({ title, value }) => {
  return (
    <div className="SingleMetricDisplay">
      <span className="SingleMetricDisplay__title">{title}</span>
      <span className="SingleMetricDisplay__value">{value}</span>
    </div>
  )
}

export default SingleMetricDisplay
