import React, { useState } from "react"
import Main from "../templates/main/Main"
import CodeHighlights from "../components/CodeHighlights/CodeHighlights"
import TimeCodingChart from "../components/TimeCodingChart/TimeCodiingChart"
import UiButton from "../components/UiButton/UiButton"
import ProgLangChart from "../components/ProgLangChart/ProgLangChart"

const codeStatsEndpoint = process.env.GATSBY_CODE_STATS_LAMBDA
const codeDurationsEndpoint = process.env.GATSBY_CODE_DURATIONS_LAMBDA

export default function CodeMetrics() {
  const [triggerReload, setTriggerReload] = useState(false)

  const clearCache = () => {
    setTriggerReload(!triggerReload)
  }

  return (
    <Main>
      <h2 className="post__title">Code Metrics</h2>
      <p className="pt-2" style={{ marginBottom: "0" }}>
        This dashboard integrates data on my coding activity from several APIs.{" "}
      </p>

      <div className="ui-button-wrapper">
        <UiButton action={clearCache} text="Clear cache" />
      </div>
      <CodeHighlights endpoint={codeStatsEndpoint} />
      <TimeCodingChart
        endpoint={codeDurationsEndpoint}
        reload={triggerReload}
      />
      <ProgLangChart endpoint={codeStatsEndpoint} reload={triggerReload} />
    </Main>
  )
}
