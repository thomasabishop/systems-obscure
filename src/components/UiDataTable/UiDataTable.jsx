import React from "react"
import "./UiDataTable.scss"

const UiDataTable = ({ headers = [], rows = [] }) => {
  const fields = rows.length ? Object.keys(rows[0]) : []

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
            {fields.map((field, j) => (
              <div className="UiDataTable__table--rows__row" key={j}>
                <span>{row[field]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="UiDataTable__footer">
        <div className="UiDataTable__footer--element__count">
          <div>5 entries of 15</div>
        </div>
        <div className="UiDataTable__footer--element__current">
          <div>1</div>
        </div>
        <div className="UiDataTable__footer--element__paginator">
          <div className="previous">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <path d="M0 0 L5 5 L10 0 Z" fill="#ebdbb2" />
            </svg>
          </div>
          <div className="next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <path d="M0 0 L5 5 L10 0 Z" fill="#ebdbb2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UiDataTable
