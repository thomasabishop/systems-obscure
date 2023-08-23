/**
 *
 * @param {*} unixTimestamp : Number
 * @returns date in format DD-MM-YYYY
 */
const formatUnixTimestamp = (unixTimestamp) => {
  unixTimestamp = Number(unixTimestamp)
  let date = new Date(unixTimestamp * 1000)
  let day = date.getDate()
  let monthIndex = date.getMonth() + 1 // Get month index (0 based, hence +1)
  let year = date.getFullYear()

  // Add leading zero for single digit day
  day = day < 10 ? "0" + day : day
  // Add leading zero for single digit month
  monthIndex = monthIndex < 10 ? "0" + monthIndex : monthIndex

  return day + "-" + monthIndex + "-" + year
}

export { formatUnixTimestamp }
