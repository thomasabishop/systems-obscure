import React from "react"
import "./Button.scss"
const Button = ({ buttonText, action, disabled }) => {
  const handleClick = () => {
    action()
  }

  return (
    <button
      className="Button"
      style={{ minWidth: "80px" }}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  )
}

export default Button
