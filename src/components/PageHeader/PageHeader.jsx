import React from "react"
import "./PageHeader.scss"

const PageHeader = ({ headerTitle }) => {
  return (
    <div className="PageHeader">
      <h1>{headerTitle}</h1>
    </div>
  )
}

export default PageHeader
