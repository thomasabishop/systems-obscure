import React, { useState } from "react"
import "./ActivityPictograph.scss"
import {
  generateDays,
  dateToBritFormat,
  groupAsWeeks,
  getMonthLabel,
} from "./lib"

import UiStaticTooltip from "../UiStaticTooltip/UiStaticTooltip"

const ActivityPictograph = ({
  handleDaySelect,
  handleEmptyDaySelect,
  handleReset,
  entryCount,
  selectedDay,
}) => {
  const [hoveredDay, setHoveredDay] = useState(null)
  const days = generateDays(365)
  const weeks = groupAsWeeks(days)
  const today = new Date()

  const countLookup = entryCount.reduce((obj, item) => {
    obj[item.date] = item.count
    return obj
  }, {})

  const monthLabels = days.reduce((acc, date, index) => {
    if (index % 7 === 0 && new Date(date).getDate() <= 7) {
      acc.push({ label: getMonthLabel(date), index: Math.floor(index / 7) })
    }
    return acc
  }, [])

  const generateShade = (count) => {
    if (count === 1) return "yellow"
    if (count === 2) return "orange"
    if (count >= 3) return "red"
    return "blank"
  }

  return (
    <div className="ActivityPictograph">
      <div className="ActivityPictograph__months">
        {monthLabels.map(({ label, index }, i) => (
          <div
            key={i}
            className="ActivityPictograph__month-label"
            style={{ gridColumnStart: index + 1 }}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="ActivityPictograph__array">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="ActivityPictograph__array--week">
            {week.map((day, dayIndex) =>
              countLookup[day] > 0 ? (
                <button
                  key={dayIndex}
                  className={`ActivityPictograph__array--day__populated ${generateShade(
                    countLookup[day]
                  )}`}
                  onMouseOver={() => setHoveredDay(day)}
                  onMouseOut={() => setHoveredDay(null)}
                  onClick={() => handleDaySelect(day)}
                />
              ) : (
                <button
                  key={dayIndex}
                  className="ActivityPictograph__array--day"
                  onMouseOver={() => setHoveredDay(day)}
                  onMouseOut={() => setHoveredDay(null)}
                  onClick={() => handleEmptyDaySelect(day)}
                />
              )
            )}
          </div>
        ))}
      </div>
      <div className="ActivityPictograph__controls">
        <div className="ActivityPictograph__controls--scale">
          <div className="label">Less</div>
          <div className="heat-boxes">
            <div className="heat-box yellow"></div>
            <div className="heat-box orange"></div>
            <div className="heat-box red"></div>
          </div>
          <div className="label">More</div>
        </div>
        <div>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
        <UiStaticTooltip
          x={hoveredDay ? dateToBritFormat(hoveredDay) : selectedDay}
          conditionalStyles=""
        />
      </div>
    </div>
  )
}

export default ActivityPictograph
