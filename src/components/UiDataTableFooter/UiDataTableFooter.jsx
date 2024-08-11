import React, { useState } from "react"
import "./UiDataTableFooter.scss"
import leftArrow from "../../img/arrow-left-button.svg"
import leftArrowPressed from "../../img/arrow-left-button-pressed.svg"
import rightArrow from "../../img/arrow-right-button.svg"
import rightArrowPressed from "../../img/arrow-right-button-pressed.svg"

const UiDataTableFooter = ({
  loading,
  error,
  pageCount,
  totalRows,
  currentPage,
  onLoadNextPage,
  onLoadPrevPage,
}) => {
  const [leftPressed, setLeftPressed] = useState(false)
  const [rightPressed, setRightPressed] = useState(false)

  const handleBackClick = () => {
    setLeftPressed(true)
    onLoadPrevPage()
    setTimeout(() => setLeftPressed(false), 150)
  }

  const handleForwardClick = () => {
    setRightPressed(true)
    onLoadNextPage()
    setTimeout(() => setRightPressed(false), 150)
  }

  if (error) {
    return (
      <div className="UiDataTableFooter">
        <div className="UiDataTableFooter__error">
          <div>{error}</div>
        </div>
      </div>
    )
  }

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
            <div>{`${currentPage} of ${pageCount}`}</div>
          </div>
        </>
      )}
      <div className="UiDataTableFooter__controls">
        <button className="previous" onClick={handleBackClick}>
          <img src={leftPressed ? leftArrowPressed : leftArrow} />
        </button>
        <button className="previous" onClick={handleForwardClick}>
          <img src={rightPressed ? rightArrowPressed : rightArrow} />
        </button>
      </div>
    </div>
  )
}

export default UiDataTableFooter
