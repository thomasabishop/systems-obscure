import React from "react"
import "./UiTimeControls.scss"

const UiTimeControls = ({ timeRange, onRangeChange, includeYear }) => {
  const handleClick = (timeRange) => {
    onRangeChange(timeRange)
  }

  return (
    <div className="UiTimeControls">
      <div
        className={`option ${
          timeRange === "last_7_days" ? "UiTimeControls__option--active" : ""
        }`}
        onClick={() => handleClick("last_7_days")}
      >
        <span>
          <span
            className={`ui-char-emph ${
              timeRange === "last_7_days" ? "ui-char-emph__active" : ""
            }`}
          >
            W
          </span>
          eek
        </span>
      </div>

      <div
        className={`UiTimeControls__option ${
          timeRange === "last_30_days" ? "UiTimeControls__option--active" : ""
        }`}
        onClick={() => handleClick("last_30_days")}
      >
        <span>
          <span
            className={`ui-char-emph ${
              timeRange === "last_30_days" ? "ui-char-emph__active" : ""
            }`}
          >
            M
          </span>
          onth
        </span>
      </div>
      {includeYear && (
        <div
          className={`UiTimeControls__option ${
            timeRange === "last_year" ? "UiTimeControls__option--active" : ""
          }`}
          onClick={() => handleClick("last_year")}
        >
          <span>
            <span
              className={`ui-char-emph ${
                timeRange === "last_year" ? "ui-char-emph__active" : ""
              }`}
            >
              Y
            </span>
            ear
          </span>
        </div>
      )}
    </div>
  )
}

export default UiTimeControls
