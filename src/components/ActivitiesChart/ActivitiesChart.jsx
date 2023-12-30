import React, { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import Chart from "../Chart/Chart"
import { options } from "./options"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { createActivityDatasets } from "../../helpers/createActivityDatasets"
import ChartControls from "../ChartControls/ChartControls"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ActivitiesChart = ({
  data,
  colours,
  loading,
  timeRange,
  onChangeTimeRange,
  onRefreshData,
}) => {
  const { labels, datasets } = createActivityDatasets(data, colours)

  const chartData = {
    labels: labels,
    datasets,
  }

  const chartControls = [
    {
      name: "Week",
      value: "week",
    },
    {
      name: "Month",
      value: "month",
    },
  ]
  return (
    <Chart
      chart={<Bar height="400px" options={options} data={chartData} />}
      controls={
        <ChartControls
          id="activities-chart-controls"
          controls={chartControls}
          loading={loading}
          timeRange={timeRange}
          onChangeTimeRange={onChangeTimeRange}
          refreshable={true}
          onRefreshData={onRefreshData}
        />
      }
    />
  )
}

export default ActivitiesChart
