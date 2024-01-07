import React, { useState } from "react"
import CodingDurationsChart from "../CodingDurationsChart/CodingDurationsChart"
import MetricHighlights from "../MetricHighlights/MetricHighlights"
import ProgrammingLanguagesChart from "../ProgrammingLanguagesChart/ProgrammingLanguagesChart"
import "./CodeMetrics.scss"
import ActivitiesView from "../ActivitiesView/ActivitiesView"
import { ToastContainer } from "react-bootstrap"
import ErrorToast from "../ErrorToast/ErrorToast"

const codeMetricsEndpoint = process.env.GATSBY_CODE_METRICS_API
const activitiesEndpoint = process.env.GATSBY_ACTIVITIES_LAMBDA

const CodeMetrics = () => {
  const [errors, setErrors] = useState([])

  const addError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error])
  }

  const removeError = (index) => {
    setErrors((prevErrors) => prevErrors.filter((_, i) => i !== index))
  }

  return (
    <div className="CodeMetrics">
      <ToastContainer position="bottom-end" className="ToastContainer p-4">
        {errors.map((error, i) => (
          <ErrorToast key={i} errorMessage={error} onClose={() => removeError(i)} />
        ))}
      </ToastContainer>

      <p className="pt-2">
        This dashboard integrates data on my coding activity from a variety of APIs. The data is
        cached client-side, click 'Refresh' to update.
      </p>

      <div className="CodeMetrics__block pt-3">
        <MetricHighlights endpoint={codeMetricsEndpoint} onError={addError} />
      </div>

      <div className="CodeMetrics__block pt-3">
        <ActivitiesView endpoint={activitiesEndpoint} onError={addError} />
      </div>

      <div className="CodeMetrics__block pt-3">
        <CodingDurationsChart endpoint={codeMetricsEndpoint} onError={addError} />
      </div>

      <div className="CodeMetrics__block pt-3">
        <ProgrammingLanguagesChart endpoint={codeMetricsEndpoint} onError={addError} />
      </div>
    </div>
  )
}

export default CodeMetrics
