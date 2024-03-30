import React from "react"

const UiTimeControls = ({ timeRange, onRangeChange }) => {
  const handleClick = (timeRange) => {
    onRangeChange(timeRange)
  }

  return (
    <div className="ui-time-controls">
      <div
        className={`option ${timeRange === "last_7_days" ? "active" : ""}`}
        onClick={() => handleClick("last_7_days")}
      >
        <span>
          <span
            className={`ui-char-emph ${timeRange === "last_7_days" ? "active" : ""}`}
          >
            W
          </span>
          eek
        </span>
      </div>

      <div
        className={`option ${timeRange === "last_30_days" ? "active" : ""}`}
        onClick={() => handleClick("last_30_days")}
      >
        <span>
          <span
            className={`ui-char-emph ${timeRange === "last_30_days" ? "active" : ""}`}
          >
            M
          </span>
          onth
        </span>
      </div>

      <div
        className={`option ${timeRange === "last_year" ? "active" : ""}`}
        onClick={() => handleClick("last_year")}
      >
        <span>
          <span
            className={`ui-char-emph ${timeRange === "last_year" ? "active" : ""}`}
          >
            Y
          </span>
          ear
        </span>
      </div>
    </div>
  )
}

export default UiTimeControls
