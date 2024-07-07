import React from "react"
import "./UiSelect.scss"

const UiSelect = ({ options, value, onChange, name }) => {
  return (
    <div className="UiSelect">
      <select
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default UiSelect
