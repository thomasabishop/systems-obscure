import React from "react"
import IconButton from "../../IconButton/IconButton"
const ViewControls = () => {
  return (
    <>
      <IconButton iconName="bar-chart" tooltipText="View as chart" isActive={true} />
      <IconButton iconName="table" tooltipText="View as table" isActive={false} />
    </>
  )
}

export default ViewControls
