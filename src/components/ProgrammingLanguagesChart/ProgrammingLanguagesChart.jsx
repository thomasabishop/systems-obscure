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
      borderWidth: 1,
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
      display: false,
      text: "Programming Languages",
    },
  },
}

const ProgrammingLanguagesChart = ({ data, loading, error }) => {
  console.log(data)
  const nonZeroValues = data?.filter((datum) => Number(datum?.decimal) > 0)
  const labels = nonZeroValues?.map((value) => value?.name)
  const values = nonZeroValues?.map((value) => value?.decimal)

  console.log(values)
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
