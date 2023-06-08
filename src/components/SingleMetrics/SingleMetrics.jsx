import React from "react"
import SingleMetricDisplay from "../SingleMetricDisplay/SingleMetricDisplay"
import "./SingleMetrics.scss"

const SingleMetrics = ({ data }) => {
  const singleMetrics = [
    {
      title: "Total",
      value: data?.human_readable_total,
    },
    {
      title: "Daily average",
      value: data?.human_readable_daily_average,
    },
    {
      title: "Best single day",
      value: data?.best_day?.text,
    },
  ]

  return (
    <div className="SingleMetrics">
      {singleMetrics.map((metric) => (
        <SingleMetricDisplay title={metric?.title} value={metric?.value} />
      ))}
    </div>
  )
}
export default SingleMetrics
