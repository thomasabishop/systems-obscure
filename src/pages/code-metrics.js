import React, { useState } from "react"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
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
      <UiGroup title="Code Metrics">
        <p>
          This dashboard integrates data on my coding activity from several
          APIs.
        </p>

        <CodeHighlights endpoint={codeStatsEndpoint} reload={triggerReload} />

        <TimeCodingChart
          endpoint={codeDurationsEndpoint}
          reload={triggerReload}
        />
        <ProgLangChart endpoint={codeStatsEndpoint} reload={triggerReload} />
      </UiGroup>
    </Main>
  )
}

export const Head = () => <title> Code Metrics | Systems Obscure</title>
