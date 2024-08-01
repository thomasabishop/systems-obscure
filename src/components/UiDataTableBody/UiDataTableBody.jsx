import React from "react"
import ".UiDataTableBody.scss"

const UiDataTableBody = ({ smallScreen, headers, dataChunks, emptyRows }) => {
  return (
    <div className="UiDataTableBody">
      {!smallScreen ? (
        <div className="UiDataTableBody__standard">
          <div className="headings">
            {headers.map((heading, i) => (
              <div className="UiDataTable__table--headings__header" key={i}>
                <span>{heading}</span>
              </div>
            ))}
          </div>
          {dataChunks[currentChunk]?.map((row, i) => (
            <div className={`row ${i === 0 ? "first-row" : ""}`}>
              {fields.map((field, j) => (
                <div className="field" key={j}>
                  {renderCell(row, field)}
                </div>
              ))}
            </div>
          ))}

          {[...Array(emptyRowsCount)].map((_, i) => (
            <div className="row" key={`empty-${i}`}>
              {fields.map((_, j) => (
                <div className="field" key={j}>
                  <span>&nbsp;</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="UiDataTableBody__condensed">
          <div className="headings"></div>
        </div>
      )}
      <div></div>
    </div>
  )
}

export default UiDataTableBody
