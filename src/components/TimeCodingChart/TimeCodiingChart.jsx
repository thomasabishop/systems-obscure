import React, { useState, useEffect, useMemo } from "react"

import axios from "axios"
import { AxisBottom } from "@visx/axis"
import { Group } from "@visx/group"
import { Bar } from "@visx/shape"
import { PatternLines } from "@visx/pattern"
import { scaleBand, scaleLinear, scaleTime } from "@visx/scale"

import UiTimeControls from "../UiTimeControls/UiTimeControls"
import UiGroup from "../UiGroup/UiGroup"
const width = 748
const height = 350

const verticalMargin = 120
const horizontalMargin = 30

const background = "#282828"
const blue = "#7daea3"
const green = "#a9b665"
const orange = "#e78a4e"
const textColor = "#fbf1c7"
const tickColor = "#665c54"

const getDate = (datum) => datum.date
const getDuration = (datum) => datum.duration

const TimeCodingChart = ({ endpoint }) => {
  const [data, setData] = useState(null)
  const [timeRange, setTimeRange] = useState("last_30_days")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const xMax = width - horizontalMargin
  const yMax = height - verticalMargin

  const fetchData = async (timeRange) => {
    try {
      const response = await axios.get(`${endpoint}?timePeriod=${timeRange}`)
      setData(
        response?.data?.data.map((d) => ({
          ...d,
          duration: parseFloat(d.duration),
        }))
      )

      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError("Coding highlights could not be fetched: " + err.message + ".")
    }
  }

  const handleTimeRangeChange = (time) => {
    setTimeRange(time)
  }

  const yScale = useMemo(() => {
    if (!data || data.length === 0) return undefined

    const maxDuration = Math.max(...data.map((d) => parseFloat(getDuration(d))))

    return scaleLinear({
      range: [yMax, 0],
      domain: [0, maxDuration],
      nice: true,
    })
  }, [data, yMax])

  const xScale = useMemo(() => {
    if (!data) return undefined
    return scaleBand({
      range: [0, xMax],
      domain: data && data?.map(getDate),
      padding: 0.4,
    })
  }, [data, xMax])

  useEffect(() => {
    setLoading(true)
    fetchData(timeRange)
  }, [timeRange])

  return (
    <UiGroup
      title="Time coding"
      minHeight={350}
      controls={
        <UiTimeControls
          timeRange={timeRange}
          onRangeChange={handleTimeRangeChange}
        />
      }
    >
      {loading || !xScale || !yScale ? (
        <span>Loading...</span>
      ) : (
        <svg width={width} height={height}>
          <rect width={width} height={height} fill="transparent" />
          <Group left={horizontalMargin / 2} top={verticalMargin / 2}>
            {data.map((d) => {
              const date = getDate(d)
              const duration = getDuration(d)
              const barWidth = xScale.bandwidth()
              const barHeight = yMax - (yScale(duration) ?? 0)
              const barX = xScale(date)
              const barY = yMax - barHeight

              return (
                <React.Fragment key={`labeled-bar-${date}`}>
                  <PatternLines
                    id="lines"
                    height={8}
                    width={8}
                    stroke={orange}
                    strokeWidth={1}
                    orientation={["diagonal"]}
                  />

                  <Bar
                    key={`bar-${date}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="url(#lines)"
                  />
                  <text
                    key={`text-label-${duration}`}
                    x={barX}
                    y={barY}
                    dx={barWidth / 2}
                    dy="-1em"
                    fontSize={10}
                    fill={textColor}
                    textAnchor="middle"
                    className="ui-vsix-bar-label"
                  >
                    {`${duration}`}
                  </text>
                </React.Fragment>
              )
            })}
            <AxisBottom
              scale={xScale}
              top={yMax}
              numTicks={timeRange !== "last_7_days" ? 4 : data.length}
              tickStroke={tickColor}
              tickLabelProps={{
                fill: textColor,
                dx: timeRange !== "last_7_days" && 10,
              }}
              axisLineClassName="ui-visx-axis-line"
              tickClassName="ui-visx-axis-tick"
            />
          </Group>
        </svg>
      )}
    </UiGroup>
  )
}

export default TimeCodingChart
