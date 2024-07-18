import React from "react"
import "./UiSelect.scss"
import Select from "react-select"

const customStyles = {
  control: (base) => ({
    ...base,
    height: 10,
    minHeight: 20,
    maxHeight: 10,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0px 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: 0,
  }),

  indicator: (provided, state) => ({
    ...provided,
    height: 30,
    width: 30,
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    height: 10,
    width: 10,
  }),

  indicatorSeparator: (state) => ({
    display: "none",
  }),
}

const UiSelect = ({ defaultValue, onChange, options, placeholder }) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className="UiSelect"
      classNamePrefix="UiSelect"
      styles={customStyles}
    />
  )
}

export default UiSelect
