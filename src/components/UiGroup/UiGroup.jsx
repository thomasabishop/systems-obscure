import React from "react"
import UiHeader from "../UiHeader/UiHeader"
import "./UiGroup.scss"

const UiGroup = ({ title, controls, children, minHeight = undefined }) => {
  return (
    <div className="UiGroup">
      <UiHeader title={title} controls={controls} />
      <div className="UiGroup__content" style={{ minHeight: minHeight }}>
        {children}
      </div>
    </div>
  )
}

export default UiGroup
