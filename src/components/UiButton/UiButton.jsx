import React from "react"

const UiButton = ({ text, action }) => {
  const handleClick = () => {
    action()
  }

  return (
    <button className="ui-button" onClick={handleClick}>
      {text}
    </button>
  )
}

export default UiButton
