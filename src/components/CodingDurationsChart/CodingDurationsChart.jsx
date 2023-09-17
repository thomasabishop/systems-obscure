import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  elements: {
    line: {
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
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Durations",
    },
  },
}

const CodingDurationsChart = ({ data, loading, error }) => {
  const labels = data?.map((datum) => datum?.date)
  const values = data?.map((datum) => datum?.duration)

  // "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",

  const chartJsData = {
    labels,
    datasets: [
      {
        fill: true,
        data: values,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="chart-wrapper">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Bar height="300px" options={options} data={chartJsData} />
      )}
    </div>
  )
}

export default CodingDurationsChart
