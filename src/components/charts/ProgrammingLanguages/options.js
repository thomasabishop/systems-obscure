const options = {
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

export { options }
