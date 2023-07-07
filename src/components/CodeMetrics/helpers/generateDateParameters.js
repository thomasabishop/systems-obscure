function generateDateParameters(period) {
  let end = new Date()
  let start = new Date()

  switch (period) {
    case "last_6_months":
      start.setMonth(start.getMonth() - 6)
      break
    case "last_year":
      start.setFullYear(start.getFullYear() - 1)
      break
    case "all_time":
      start = new Date("2019-03-19")
      break
    default:
      return "Invalid period"
  }

  // format date to 'YYYY-MM-DD'
  const formatDate = (date) => {
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return [year, month, day].join("-")
  }

  return `?start=${formatDate(start)}&end=${formatDate(end)}`
}

export default generateDateParameters
