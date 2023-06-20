import React from "react"
import "./Scorecard.scss"

const Scorecard = ({ title, value }) => {
  return (
    <div className="Scorecard">
      <span className="Scorecard__title">{title}</span>
      <span className="Scorecard__value">{value}</span>
    </div>
  )
}

export default Scorecard
