const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

/**
 *
 * @param {*} unixTimestamp : Number
 * @returns date in format DD-MM-YYYY
 */
const formatUnixTimestamp = (unixTimestamp) => {
  unixTimestamp = Number(unixTimestamp)
  let date = new Date(unixTimestamp * 1000)
  let day = date.getDate()
  let month = monthNames[date.getMonth()]
  let year = date.getFullYear()

  return day + " " + month + " " + year
}

export { formatUnixTimestamp }
