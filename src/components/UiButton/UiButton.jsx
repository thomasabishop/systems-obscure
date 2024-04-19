import React from "react"
import "./UiButton.scss"
const UiButton = ({ text, action }) => {
  const handleClick = () => {
    action()
  }

  return (
    <button className="UiButton" onClick={handleClick}>
      {text}
    </button>
  )
}

export default UiButton
