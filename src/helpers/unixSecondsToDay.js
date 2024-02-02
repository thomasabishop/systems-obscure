const unixSecondsToDay = (seconds) => {
  const days = Math.floor(seconds / (24 * 60 * 60))
  seconds -= days * 24 * 60 * 60
  const hours = Math.floor(seconds / (60 * 60))
  seconds -= hours * 60 * 60

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ${hours} ${
      hours === 1 ? "hour" : "hours"
    }`
  } else {
    return null
  }
}

export { unixSecondsToDay }
