import React from "react"
const UiScorecard = ({ label, metric, loading, error }) => {
  return (
    <div className="ui-scorecard">
      <div className="label">{label}</div>
      <div className="metric">
        {!loading ? (
          !error ? (
            metric
          ) : (
            <span className="ui-error">{error}</span>
          )
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  )
}

export default UiScorecard
