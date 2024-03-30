import React, { useState } from "react"
import Main from "../templates/main/Main"
import CodeHighlights from "../components/CodeHighlights/CodeHighlights"
import TimeCodingChart from "../components/TimeCodingChart/TimeCodiingChart"

const codeStatsEndpoint = process.env.GATSBY_CODE_STATS_LAMBDA
const codeDurationsEndpoint = process.env.GATSBY_CODE_DURATIONS_LAMBDA

export default function CodeMetrics() {
  return (
    <Main>
      <h2 className="post__title">Code Metrics</h2>
      <p className="pt-2">
        This dashboard integrates data on my coding activity from several APIs.
        The data is cached client-side. Click 'Refresh' to update.
      </p>

      <CodeHighlights endpoint={codeStatsEndpoint} />
      <TimeCodingChart endpoint={codeDurationsEndpoint} />
    </Main>
  )
}
