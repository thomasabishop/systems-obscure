import React from "react"
import "./UiDataTable.scss"

const UiDataTable = ({ headers }) => {
  return (
    <div className="UiDataTable">
      <div className="UiDataTable__table">
        <div className="UiDataTable__table--headings">
          <div className="UiDataTable__table--headings__header">
            <span>Header 1</span>
          </div>
          <div className="UiDataTable__table--headings__header">
            <span>Header 2</span>
          </div>
          <div className="UiDataTable__table--headings__header">
            <span>Header 1</span>
          </div>
          <div className="UiDataTable__table--headings__header">
            <span>Header 2</span>
          </div>
        </div>
        <div className="UiDataTable__table--rows">
          <div className="UiDataTable__table--rows__row">
            <span>Blogging</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Study</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
        </div>

        <div className="UiDataTable__table--rows">
          <div className="UiDataTable__table--rows__row">
            <span>Study</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
        </div>

        <div className="UiDataTable__table--rows">
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
        </div>
        <div className="UiDataTable__table--rows">
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
          <div className="UiDataTable__table--rows__row">
            <span>Cell 1</span>
          </div>
        </div>
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
