import React from "react"
import LoadingWidget from "../LoadingWidget/LoadingWidget"
import { Chart as ChartJS, Tooltip, Legend } from "chart.js"
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
        backgroundColor: [
          "rgba(255, 206, 86, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(75, 192, 192, 0.3)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="chart-wrapper" style={{ maxHeight: 250, width: "100%" }}>
      {loading ? <LoadingWidget /> : <Bar data={chartJsData} options={options} />}
    </div>
  )
}

export default OperatingSystemsChart
