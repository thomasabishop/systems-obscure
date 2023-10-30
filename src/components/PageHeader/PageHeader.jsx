import React from "react"
import "./PageHeader.scss"

const PageHeader = ({ headerTitle }) => {
  return (
    <div className="PageHeader">
      <h1 className="h3">{headerTitle}</h1>
    </div>
  )
}

export default PageHeader
