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
import { Line } from "react-chartjs-2"

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
  responsive: true,
  elements: {
    line: {
      borderWidth: 1,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Durations",
    },
  },
}

const CodingDurationsChart = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const chartJsData = {
    labels,
    datasets: [
      {
        fill: true,
        data: [3, 4, 5, 4.2, 4.1, 6, 5.5, 6.1, 4.5, 4.85, 5.4, 6.21],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }
  return (
    <React.Fragment>
      <Line options={options} data={chartJsData} />
    </React.Fragment>
  )
}

export default CodingDurationsChart
