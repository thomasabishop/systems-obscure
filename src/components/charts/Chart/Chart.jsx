import React from "react"
import { Card } from "react-bootstrap"
import "./Chart.scss"

const Chart = ({ chartTitle, chart, controls }) => {
  return (
    <div className="Chart mt-2">
      {/* <div className="Chart__title">
        <h2>{chartTitle}</h2>
      </div> */}
      <div className="Chart__wrapper">
        <Card>
          <Card.Header as="h4">{chartTitle}</Card.Header>
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
