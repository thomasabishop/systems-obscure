import React, { useState, useEffect } from "react"
import axios from "axios"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ChartControls from "../ChartControls/ChartControls"
import { unixSecondsToDay } from "../../helpers/unixSecondsToDay"
import MetricsView from "../MetricsView/MetricsView"
import "./MetricHighlights.scss"

const MetricHighlights = ({ endpoint, onError }) => {
  const [data, setData] = useState(null)
  const [timeRange, setTimeRange] = useState("last_30_days")
  const [loading, setLoading] = useState(null)

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?timePeriod=${timeRange}`)

      setData(response?.data?.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      onError("Coding highlights could not be fetched: " + err.message)
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
          <Col md className="mb-3 mb-md-0">
            <MetricsView
              metricName={"Total time"}
              metricView={
                !loading && (unixSecondsToDay(data?.total_seconds) || data?.human_readable_total)
              }
              loadingIndicator={loading}
            />
          </Col>
          <Col md className="mb-3 mb-md-0">
            <MetricsView
              metricName={"Daily average"}
              metricView={!loading && data?.human_readable_daily_average}
              loadingIndicator={loading}
            />
          </Col>
          <Col md>
            <MetricsView
              metricName={"Longest day"}
              metricView={!loading && data?.best_day?.text}
              loadingIndicator={loading}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MetricHighlights
