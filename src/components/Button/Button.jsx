import React from "react"
import "./Button.scss"
const Button = ({ buttonText, action, disabled }) => {
  const handleClick = () => {
    action()
  }

  return (
    <button className="Button" onClick={handleClick} disabled={disabled}>
      {buttonText}
    </button>
  )
}

export default Button
