import React from "react"
import { Card } from "react-bootstrap"
import "./Chart.scss"

const Chart = ({ chartTitle, chart, controls, viewControls }) => {
  return (
    <div className="Chart mt-2">
      <div className="Chart__wrapper">
        <Card>
          <Card.Header as="h4">
            <div>{chartTitle}</div>
            {viewControls && <div className="Chart__view-controls">{viewControls}</div>}
          </Card.Header>
          <Card.Body>
            <div className="Chart__controls">{controls}</div>
            <div className="Chart__content">{chart}</div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Chart
