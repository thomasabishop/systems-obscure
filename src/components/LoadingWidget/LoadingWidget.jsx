import React from "react"
import { Bars } from "react-loading-icons"
import "./LoadingWidget.scss"
const LoadingWidget = () => {
  return (
    <div className="LoadingWidget">
      <Bars fill="lightgrey" width={40} />
    </div>
  )
}

export default LoadingWidget
