import React from "react"
import "./UiDataTableFooter.scss"

const ChevronIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
    >
      <path d="M0 0 L5 5 L10 0 Z" fill="#ebdbb2" />
    </svg>
  )
}

const UiDataTableFooter = ({ loading, pageCount, totalRows }) => {
  console.log(pageCount)
  return (
    <div className="UiDataTableFooter">
      {loading ? (
        <div className="UiDataTableFooter__loading">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <div className="UiDataTableFooter__count">
            <div>{`Total entries: ${totalRows}`}</div>
          </div>
          <div className="UiDataTableFooter__pages">
            <div>{`1 of ${pageCount}`}</div>
          </div>
        </>
      )}

      <div className="UiDataTableFooter__paginator">
        <button
          className="previous"
          onClick={() => {
            console.log("clicked")
          }}
        >
          <ChevronIcon />
        </button>
      </div>
    </div>
  )
}

export default UiDataTableFooter
