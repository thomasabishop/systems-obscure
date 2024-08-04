import React, { useState, useEffect } from "react"
import "./UiDataTable.scss"
import UiDataTableFooter from "../UiDataTableFooter/UiDataTableFooter"

const chunkData = (rows, chunkSize) => {
  const chunks = []
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    chunks.push(chunk)
  }
  return chunks
}

const DataCell = (headers, row, field, index) => {
  const value = row[field]
  const header = headers[index] || field
  return (
    <>
      <div className="cell-header">{header}</div>
      <div className="cell-content">
        <div data-header={header}>
          <span>{value}</span>
        </div>
      </div>
    </>
  )
}

const UiDataTable = ({ headers = [], rows = [], loading, error }) => {
  const [chunks, setChunks] = useState([])
  const [currentChunk, setCurrentChunk] = useState(0)
  const [smallScreen, setSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 600
      if (isSmallScreen !== smallScreen) {
        setSmallScreen(window.innerWidth < 600)
        setCurrentChunk(0)
      }
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [smallScreen])

  useEffect(() => {
    const size = smallScreen ? 5 : 12
    const chunks = chunkData(rows, size)
    setChunks(chunks)
  }, [rows, smallScreen])

  const handleLoadNextChunk = () => {
    setCurrentChunk((prev) => Math.min(prev + 1, chunks.length - 1))
  }

  const handleLoadPrevChunk = () => {
    setCurrentChunk((prev) => Math.max(prev - 1, 0))
  }

  const fields = rows.length ? Object.keys(rows[0]) : []

  return (
    <div className="UiDataTable">
      <div
        className={`UiDataTable__table ${smallScreen ? "condensed" : "fullwidth"}`}
      >
        <div className="headings">
          {headers.map((heading, i) => (
            <div className="header" key={i}>
              <span>{heading}</span>
            </div>
          ))}
        </div>
        {chunks[currentChunk]?.map((row, i) => (
          <div className="rows">
            {fields.map((field, j) => DataCell(headers, row, field, j))}
          </div>
        ))}
      </div>
      <UiDataTableFooter
        loading={loading}
        error={error}
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
