import React from "react"
import LoadingWidget from "../LoadingWidget/LoadingWidget"

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
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time percentage",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Programming Languages",
    },
  },
}

const ProgrammingLanguagesChart = ({ data, loading, error }) => {
  const labels = data?.map((datum) => datum?.name)
  const values = data?.map((datum) => datum?.decimal)

  const chartJsData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return (
    <React.Fragment>
      {error && (
        <div className="error-wrapper">
          <span>An error occurred: {error} </span>{" "}
        </div>
      )}

      {loading ? <LoadingWidget /> : <Bar options={options} data={chartJsData} />}
    </React.Fragment>
  )
}

export default ProgrammingLanguagesChart
