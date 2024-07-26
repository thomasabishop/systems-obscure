const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date
    .toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      // hour: "2-digit",
      // minute: "2-digit",
      // hour12: false,
    })
    .replace(",", "")
}

export const parseTimeEntries = (timeEntries) => {
  return timeEntries.map((entry) => ({
    date: formatDate(entry.start),
    activity: entry.activity_type,
    duration: `${entry.duration} hrs`,
    description: entry.description,
  }))
}
