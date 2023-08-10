import React from "react"
import Main from "../templates/main/Main"
import CodeMetrics from "../components/CodeMetrics/CodeMetrics"
import PageHeader from "../components/PageHeader/PageHeader"

export default function CodeMetricsPage(props) {
  return (
    <Main>
      <PageHeader headerTitle="Code Metrics" />
      <CodeMetrics />
    </Main>
  )
}
