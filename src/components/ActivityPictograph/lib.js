const today = new Date()

const getMonthLabel = (date) =>
  new Date(date).toLocaleString("default", { month: "short" })

const groupAsWeeks = (days) => {
  return days.reduce((acc, day, index) => {
    const weekIndex = Math.floor(index / 7)
    if (!acc[weekIndex]) acc[weekIndex] = []
    acc[weekIndex].push(day)
    return acc
  }, [])
}

const dateToBritFormat = (date) =>
  new Date(date)
    .toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(/,/g, "")
    .replace(/ (\d+)(?=\s)/, " $1")

const isoToDateOnly = (iso) => iso.split("T")[0]

const generateDays = (count) => {
  const deriveDay = (curr, daysToSubtract) => {
    const current = new Date(curr)
    let prev = new Date(current)
    prev.setDate(prev.getDate() - daysToSubtract)
    return isoToDateOnly(prev.toISOString())
  }

  const currentDate = new Date()
  let totalDays = count
  const range = []
  while (totalDays >= 0) {
    range.push(deriveDay(currentDate, totalDays))
    --totalDays
  }
  return range
}

export { generateDays, dateToBritFormat, groupAsWeeks, getMonthLabel }
