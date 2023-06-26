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
import LoadingWidget from "../LoadingWidget/LoadingWidget"

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
  const labels = data?.map((datum) => datum?.range.text)
  const values = data?.map((datum) => datum?.grand_total?.decimal)

  // const calculateAverage = () => {
  //   const numericValues = values?.map((value) => Number(value))
  //   const total = numericValues?.reduce((a, b) => a + b, 0)
  //   const average = total / values?.length
  //   return average.toFixed(2)
  // }

  // "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",

  // const average = calculateAverage()

  const chartJsData = {
    labels,
    datasets: [
      {
        fill: true,
        data: values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
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
      <div className="chart-wrapper">
        {loading ? <LoadingWidget /> : <Line options={options} data={chartJsData} />}
      </div>
    )
  }
}

export default CodingDurationsChart
