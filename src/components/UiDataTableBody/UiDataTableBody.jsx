import React from "react"
import "./UiDataTableBody.scss"

const UiDataTableBody = ({
  smallScreen,
  headers,
  chunks,
  currentChunk,
  fields,
  emptyRowsCount,
}) => {
  const renderCell = (row, field) => {
    // For date fields, format the date using CSS grid for even lengths
    const value = row[field]
    if (field === "date" && typeof value === "object") {
      return (
        <div className="grid-date">
          <span>{value.day}</span>
          <span>{value.month}</span>
          <span>{value.year}</span>
        </div>
      )
    }
    return <span>{value}</span>
  }
  return (
    <div className="UiDataTableBody">
      {!smallScreen ? (
        <div className="UiDataTableBody__standard">
          <div className="headings">
            {headers.map((heading, i) => (
              <div className="headings__header" key={i}>
                <span>{heading}</span>
              </div>
            ))}
          </div>
          {chunks[currentChunk]?.map((row, i) => (
            <div className={`row ${i === 0 ? "first-row" : ""}`}>
              {fields.map((field, j) => (
                <div className="row__field" key={j}>
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
