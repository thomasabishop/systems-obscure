import React from "react"
import "./UiDataTable.scss"

const UiDataTable = ({ headers = [], rows = [] }) => {
  return (
    <div className="UiDataTable">
      <div className="UiDataTable__table">
        <div className="UiDataTable__table--headings">
          {headers.map((heading, i) => (
            <div className="UiDataTable__table--headings__header" key={i}>
              <span>{heading}</span>
            </div>
          ))}
        </div>
        {rows.map((row, i) => (
          <div
            className={`UiDataTable__table--rows ${i === 0 ? "first-row" : ""}`}
          >
            <div className="UiDataTable__table--rows__row">
              <span>{row.date}</span>
            </div>
            <div className="UiDataTable__table--rows__row">
              <span>{row.activity}</span>
            </div>
            <div className="UiDataTable__table--rows__row">
              <span>{row.duration}</span>
            </div>
            <div className="UiDataTable__table--rows__row description">
              <span>{row.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="UiDataTable__footer">
        <div className="UiDataTable__footer--element__count">
          <div>5 entries of 15</div>
        </div>
        <div className="UiDataTable__footer--element__paginator">
          <div>Arrow</div>
        </div>
      </div>
    </div>
  )
}

export default UiDataTable
