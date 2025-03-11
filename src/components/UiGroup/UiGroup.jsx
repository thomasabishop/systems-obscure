import React from "react"
import UiHeader from "../UiHeader/UiHeader"
import "./UiGroup.scss"

const UiGroup = ({
  title,
  child = false,
  icon,
  controls,
  children,
  minHeight = undefined,
  footer = null,
}) => {
  const variant = child ? `UiGroup__child` : `UiGroup`
  return (
    <div className={variant}>
      <UiHeader icon={icon} title={title} controls={controls} />
      <div className="content" style={{ minHeight: minHeight }}>
        {children}
      </div>

      {footer}
    </div>
  )
}

export default UiGroup
