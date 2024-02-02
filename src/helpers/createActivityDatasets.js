const createActivityDatasets = (rawData, chartColours) => {
  const uniqueDates = new Set(rawData.map((item) => item.date))
  const labels = [...uniqueDates]

  const datasets = rawData.reduce((acc, obj, i) => {
    let newDuration = Number(
      (
        parseFloat(obj.duration) +
        (acc.find((item) => item.label === obj.project)?.data[
          labels.indexOf(obj.date)
        ] || 0)
      ).toFixed(2)
    )
    let index = acc.findIndex((item) => item.label === obj.project)
    if (index === -1) {
      let newData = new Array(labels.length).fill(0)
      newData[labels.indexOf(obj.date)] = newDuration
      acc.push({
        label: obj.project,
        data: newData,
        backgroundColor: chartColours[obj.project][0],
        borderColor: chartColours[obj.project][1],
        borderWidth: 1,
      })
    } else {
      acc[index].data[labels.indexOf(obj.date)] = newDuration
    }
    return acc
  }, [])
  return { labels, datasets }
}

export { createActivityDatasets }
