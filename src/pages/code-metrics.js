import React from "react"
import CodeMetrics from "../components/CodeMetrics/CodeMetrics"
import PageHeader from "../components/PageHeader/PageHeader"
import Main from "../templates/main/Main"
export default function CodeMetricsPage(props) {
  return (
    <Main>
      <PageHeader headerTitle="Code Metrics" />
      <CodeMetrics />
    </Main>
  )
}
