import React from "react"
import LoadingWidget from "../LoadingWidget/LoadingWidget"
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
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

ChartJS.register(Tooltip, Legend)

const OperatingSystemsChart = ({ data, loading, error }) => {
  const labels = data?.map((datum) => datum?.name)
  const values = data?.map((datum) => datum?.percent)

  const options = {
    plugins: {
      title: {
        display: false,
        text: "Operating Systems",
      },
      legend: {
        position: "right",
        display: false,
      },
    },
  }

  const chartJsData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  }

  if (error) {
    return (
      <div className="error-wrapper">
        <span>An error occurred: {error} </span>{" "}
      </div>
    )
  } else {
    return (
      <div className="chart-wrapper" style={{ maxHeight: 250, width: "100%" }}>
        {loading ? <LoadingWidget /> : <Bar data={chartJsData} options={options} />}
      </div>
    )
  }
}

export default OperatingSystemsChart
