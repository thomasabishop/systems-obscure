import React, { useState, useEffect } from "react"
import CodingDurationsChart from "../CodingDurationsChart/CodingDurationsChart"
import ActivitiesChart from "../ActivitiesChart/ActivitiesChart"
import MetricHighlights from "../MetricHighlights/MetricHighlights"
import ProgrammingLanguagesChart from "../ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import "./CodeMetrics.scss"
// const ENDPOINT = process.env.GATSBY_METRICS_AWS_LAMBDA_ENDPOINT

const codeMetricsEndpoint = process.env.GATSBY_CODE_METRICS_API
const activitiesEndpoint = process.env.GATSBY_ACTIVITIES_LAMBDA

const CodeMetrics = () => {
  return (
    <div className="CodeMetrics">
      <p className="pt-2">
        This dashboard integrates data on my coding activity from a variety of sources.
      </p>
      <div className="CodeMetrics__block pt-3">
        <MetricHighlights endpoint={codeMetricsEndpoint} />
      </div>
      <div className="CodeMetrics__block pt-3">
        <ActivitiesChart endpoint={activitiesEndpoint} />
      </div>
      <div className="CodeMetrics__block pt-3">
        <CodingDurationsChart endpoint={codeMetricsEndpoint} />
      </div>

      <div className="CodeMetrics__block pt-3">
        <ProgrammingLanguagesChart endpoint={codeMetricsEndpoint} />
      </div>
    </div>
  )
}

export default CodeMetrics
