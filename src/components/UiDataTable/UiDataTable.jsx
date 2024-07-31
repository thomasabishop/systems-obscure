import React, { useState, useEffect } from "react"
import "./UiDataTable.scss"
import UiDataTableFooter from "../UiDataTableFooter/UiDataTableFooter"

const chunkData = (rows) => {
  const chunkSize = 12
  const chunks = []
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    chunks.push(chunk)
  }
  return chunks
}

const UiDataTable = ({ headers = [], rows = [], loading }) => {
  const [chunks, setChunks] = useState([])
  const [currentChunk, setCurrentChunk] = useState(0)

  useEffect(() => {
    const chunks = chunkData(rows)
    setChunks(chunks)
  }, [rows])

  useEffect(() => {
    console.log(currentChunk)
  }, [currentChunk])

  const handleLoadNextChunk = () => {
    setCurrentChunk((prev) => Math.min(prev + 1, chunks.length - 1))
  }

  const handleLoadPrevChunk = () => {
    setCurrentChunk((prev) => Math.max(prev - 1, 0))
  }

  const fields = rows.length ? Object.keys(rows[0]) : []
  const emptyRowsCount = 12 - (chunks[currentChunk]?.length || 0)

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
    <div className="UiDataTable">
      <div className="UiDataTable__table">
        <div className="UiDataTable__table--headings">
          {headers.map((heading, i) => (
            <div className="UiDataTable__table--headings__header" key={i}>
              <span>{heading}</span>
            </div>
          ))}
        </div>
        {chunks[currentChunk]?.map((row, i) => (
          <div
            className={`UiDataTable__table--rows ${i === 0 ? "first-row" : ""}`}
          >
            {fields.map((field, j) => (
              <div className="UiDataTable__table--rows__row" key={j}>
                {renderCell(row, field)}
              </div>
            ))}
          </div>
        ))}
        {[...Array(emptyRowsCount)].map((_, i) => (
          <div
            className="UiDataTable__table--rows empty-row"
            key={`empty-${i}`}
          >
            {fields.map((_, j) => (
              <div className="UiDataTable__table--rows__row" key={j}>
                <span>&nbsp;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <UiDataTableFooter
        loading={loading}
        pageCount={chunks.length}
        totalRows={rows.length}
        currentPage={currentChunk + 1}
        onLoadNextPage={handleLoadNextChunk}
        onLoadPrevPage={handleLoadPrevChunk}
      />
    </div>
  )
}

export default UiDataTable
