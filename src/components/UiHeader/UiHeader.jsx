import React from "react"
import "./UiHeader.scss"

const UiHeader = ({ title, icon, controls, child }) => {
  const childHeading = child
    ? `section-heading-title`
    : `section-heading-title child-heading`

  return (
    <div className="UiHeader">
      <div className="UiHeader__title">
        <div></div>
        <h2
          className={
            child
              ? "section-heading-title"
              : "section-heading-title child-heading"
          }
        >
          {title}
        </h2>
      </div>
      <div className="UiHeader__controls">{controls}</div>
    </div>
  )
}

export default UiHeader
