import React, { useState, useEffect } from "react"
import CodingDurationsChart from "../charts/CodingDurationsChart/CodingDurationsChart"
import "./CodeMetrics.scss"
import ActivitiesChart from "../charts/ActivitiesChart/ActivitiesChart"

// const ENDPOINT = process.env.GATSBY_METRICS_AWS_LAMBDA_ENDPOINT

const CODE_METRICS_ENDPOINT = process.env.GATSBY_CODE_METRICS_API
const ACTIVITIES_LAMBDA_ENDPOINT = process.env.GATSBY_ACTIVITIES_LAMBDA

const CodeMetrics = () => {
  return (
    <div className="CodeMetrics">
      <p className="pt-2">
        This dashboard integrates data on my coding activity from a variety of sources.
      </p>
      <div className="CodeMetrics__block pt-3">
        <ActivitiesChart endpoint={ACTIVITIES_LAMBDA_ENDPOINT} />
      </div>
      <div className="CodeMetrics__block pt-3">
        <CodingDurationsChart endpoint={CODE_METRICS_ENDPOINT} />
      </div>
    </div>
  )
}

export default CodeMetrics
