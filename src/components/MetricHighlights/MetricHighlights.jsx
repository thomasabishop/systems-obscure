import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import ChartControls from "../charts/ChartControls/ChartControls"
import { unixSecondsToDay } from "../../helpers/unixSecondsToDay"
import "./MetricHighlights.scss"

const Highlight = ({ title, value, loading }) => {
  return (
    <Col md>
      <Card className="Higlight">
        <Card.Header as="h5">
          <span>{title}</span>
          {loading && <Spinner variant="secondary" animation="border" size="sm" />}
        </Card.Header>
        <Card.Body>
          <Card.Text>{value}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

const MetricHighlights = ({ endpoint }) => {
  const resourcePath = "stats"
  const [data, setData] = useState(null)
  const [timeRange, setTimeRange] = useState("last_30_days")
  const [loading, setLoading] = useState(null)

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}/${resourcePath}?timePeriod=${timeRange}`)

      setData(response?.data?.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const handleTimeRangeChange = (timeRange) => {
    setTimeRange(timeRange)
  }

  useEffect(() => {
    setLoading(true)
    fetchData(timeRange)
  }, [timeRange])

  const controls = [
    {
      name: "Week",
      value: "last_7_days",
    },
    {
      name: "Month",
      value: "last_30_days",
    },
    {
      name: "Year",
      value: "last_year",
    },
  ]

  return (
    <div className="MetricHighlights">
      <div className="MetricHighlights__controls-wrapper">
        <ChartControls
          id="highlights-controls"
          timeRange={timeRange}
          controls={controls}
          onChangeTimeRange={handleTimeRangeChange}
        />
      </div>
      <div className="MetricHighlights__highlights mt-4">
        <Row>
          <Highlight
            title="Total time"
            value={
              !loading && (unixSecondsToDay(data?.total_seconds) || data?.human_readable_total)
            }
            loading={loading}
          />
          <Highlight
            title="Daily average"
            value={!loading && data?.human_readable_daily_average}
            loading={loading}
          />
          <Highlight
            title="Longest day"
            value={!loading && data?.best_day?.text}
            loading={loading}
          />
        </Row>
      </div>
    </div>
  )
}

export default MetricHighlights
