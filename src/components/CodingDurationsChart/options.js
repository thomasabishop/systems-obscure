const options = {
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

export { options }
