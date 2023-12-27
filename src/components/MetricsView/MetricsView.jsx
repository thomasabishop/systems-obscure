import React from "react"
import { Card, Spinner } from "react-bootstrap"
import "./MetricsView.scss"

const MetricsView = ({ metricName, metricView, viewControls, loadingIndicator }) => {
  return (
    <Card className="MetricsView">
      <Card.Header as="h4">
        <div>{metricName}</div>
        <div>
          {viewControls && <div>{viewControls}</div>}
          {loadingIndicator && <Spinner variant="secondary" animation="border" size="sm" />}
        </div>
      </Card.Header>
      <Card.Body>{metricView}</Card.Body>
    </Card>
  )
}

export default MetricsView
