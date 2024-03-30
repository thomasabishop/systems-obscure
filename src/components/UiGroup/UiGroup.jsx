import React from "react"
import UiHeader from "../UiHeader/UiHeader"

const UiGroup = ({ title, controls, children, minHeight = undefined }) => {
  return (
    <div className="ui-group">
      <UiHeader title={title} controls={controls} />
      <div className="ui-group__content" style={{ minHeight: minHeight }}>
        {children}
      </div>
    </div>
  )
}

export default UiGroup