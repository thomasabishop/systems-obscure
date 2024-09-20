const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date
    .toLocaleString("en-GB", {
      //     weekday: "short",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replace(",", "")
}

const formatStartTime = (isoString) => {
  const time = new Date(isoString)
  return time.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export const parseTimeEntries = (timeEntries) => {
  return timeEntries
    .map((entry) => ({
      date: formatDate(entry.start),
      time: formatStartTime(entry.start),
      activity: entry.activity_type,
      duration: `${entry.duration} hrs`,
      description: entry.description,
    }))
    .reverse()
}
