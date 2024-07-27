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

  const handleLoadNextChunk = () => {
    setCurrentChunk(currentChunk++)
  }

  // const handleLoadPrevChunk = () => {
  // setCurrentChunk(currentChunk++)
  // }

  console.log(chunks)
  console.log(chunks[currentChunk])

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
        {chunks[currentChunk]?.map((row, i) => (
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
      <UiDataTableFooter
        loading={loading}
        pageCount={chunks.length}
        totalRows={rows.length}
      />
    </div>
  )
}

export default UiDataTable
