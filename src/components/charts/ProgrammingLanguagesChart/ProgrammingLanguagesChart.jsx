import React from "react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  maintainAspectRatio: false,
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Hours",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Programming Languages",
    },
  },
}

const ProgrammingLanguagesChart = ({ data, loading, error }) => {
  const nonZeroValues = data?.filter((datum) => Number(datum?.decimal) > 0.1)
  const labels = nonZeroValues?.map((value) => value?.name)
  const values = nonZeroValues?.map((value) => value?.decimal)
  const chartJsData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
      },
    ],
  }

  return (
    <div className="chart-wrapper">
      <Bar height="300px" options={options} data={chartJsData} />
    </div>
  )
}

export default ProgrammingLanguagesChart