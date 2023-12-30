import React from "react"
import CodingDurationsChart from "../CodingDurationsChart/CodingDurationsChart"
import MetricHighlights from "../MetricHighlights/MetricHighlights"
import ProgrammingLanguagesChart from "../ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import "./CodeMetrics.scss"
import ActivitiesView from "../ActivitiesView/ActivitiesView"

const codeMetricsEndpoint = process.env.GATSBY_CODE_METRICS_API
const activitiesEndpoint = process.env.GATSBY_ACTIVITIES_LAMBDA

const CodeMetrics = () => {
  return (
    <div className="CodeMetrics">
      <div className="CodeMetrics__block pt-3">
        <MetricHighlights endpoint={codeMetricsEndpoint} />
      </div>

      <div className="CodeMetrics__block pt-3">
        <ActivitiesView endpoint={activitiesEndpoint} />
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
