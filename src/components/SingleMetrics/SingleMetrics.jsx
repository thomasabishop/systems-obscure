import React from "react"
import Scorecard from "../Scorecard/Scorecard"
import "./SingleMetrics.scss"

const SingleMetrics = ({ data, loading, error }) => {
  const singleMetrics = [
    {
      title: "Total",
      value: data?.total,
    },
    {
      title: "Total today",
      value: data?.totalToday,
    },
    {
      title: "Daily average",
      value: data?.dailyAverage,
    },
    {
      title: "Longest day",
      value: data?.bestDay,
    },
  ]

  return (
    <div className="SingleMetrics">
      {singleMetrics.map((metric, i) => (
        <Scorecard
          key={i}
          title={metric?.title}
          value={error ? "Error" : metric?.value}
          loading={loading}
        />
      ))}
    </div>
  )
}
export default SingleMetrics
