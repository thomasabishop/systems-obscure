import React from "react"
import "./UiFilterControls.scss"

const UiFilterControls = ({}) => {
  return (
    <div className="UiFilterControls">
      <select>
        <option selected>All</option>
        <option>Articles</option>
        <option>Projects</option>
        <option>Log</option>
        <option>Learning</option>
      </select>
    </div>
  )
}

export default UiFilterControls
