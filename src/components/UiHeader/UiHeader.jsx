import React from "react"

const UiHeader = ({ title, controls }) => {
  return (
    <div className="ui-header">
      <div className="title">{title}</div>
      <div className="controls">{controls}</div>
    </div>
  )
}

export default UiHeader
