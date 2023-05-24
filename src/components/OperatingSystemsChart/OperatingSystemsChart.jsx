import React from "react"
import LoadingWidget from "../LoadingWidget/LoadingWidget"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const OperatingSystemsChart = ({ data, loading, error }) => {
  console.log(data)
  const labels = data?.map((datum) => datum?.name)
  const values = data?.map((datum) => datum?.percent)

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Operating Systems",
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

  return (
    <React.Fragment>
      {error && (
        <div className="error-wrapper">
          <span>An error occurred: {error} </span>{" "}
        </div>
      )}

      {loading ? (
        <LoadingWidget />
      ) : (
        <div
          style={{
            width: "100%",
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Doughnut data={chartJsData} options={options} />{" "}
        </div>
      )}
    </React.Fragment>
  )
}

export default OperatingSystemsChart
