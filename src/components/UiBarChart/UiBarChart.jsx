import React, { useState, useMemo, useEffect } from "react"
import UiStaticTooltip from "../PictographTooltip/PictographTooltip"
import { useParentSize } from "@visx/responsive"
import { scaleBand, scaleLinear } from "@visx/scale"
import { Group } from "@visx/group"
import { PatternLines } from "@visx/pattern"
import { Bar } from "@visx/shape"
import { AxisBottom } from "@visx/axis"
import ChartTooltip from "../ChartTooltip/ChartTooltip"
const textColor = "#ebdbb2"
const tickColor = "#32302f"

const height = 300

const verticalMargin = 80
const horizontalMargin = 30

const UiBarChart = ({
  data,
  loading,
  error,
  barColour,
  timeRange,
  getX,
  getY,
  xMetric,
  yMetric,
}) => {
  const [smallScreen, setSmallScreen] = useState(false)
  const [tooltipData, setTooltipData] = useState({})
  const { parentRef, width } = useParentSize({
    ignoreDimensions: ["height"],
    debounceTime: 150,
  })

  const xMax = width - horizontalMargin
  const yMax = height - verticalMargin

  const yScale = useMemo(() => {
    if (!data || data?.length === 0) return undefined

    const maxDuration = Math.max(...data?.map((d) => parseFloat(getY(d))))

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
      domain: data && data?.map(getX),
      padding: 0.4,
    })
  }, [data, xMax])

  const handleMouseOver = (event, datum) => {
    setTooltipData(datum)
  }

  const getTickCount = () => {
    if (smallScreen) {
      return 0
    }

    if (timeRange !== "last_7_days") {
      return 4
    } else return data?.length
  }

  useEffect(() => {
    const checkScreenWidth = () => {
      setSmallScreen(window.innerWidth < 600)
    }
    checkScreenWidth()
    window.addEventListener("resize", checkScreenWidth)
    return () => window.removeEventListener("resize", checkScreenWidth)
  }, [])

  if (error) {
    return <span className="ui-error">{error}</span>
  }

  return loading ? (
    <span>Loading...</span>
  ) : (
    <>
      <ChartTooltip data={tooltipData} x={xMetric} y={yMetric} />
      <div className={`ui-responsive-chart-wrapper`} ref={parentRef}>
        <svg width={width} height={height} className="visx-svg-chart">
          <rect width={width} height={height} fill="transparent" />
          <Group left={horizontalMargin / 2} top={verticalMargin / 2}>
            {data?.map((d) => {
              const date = getX(d)
              const duration = getY(d)
              const barWidth = xScale.bandwidth()
              const barHeight = yMax - (yScale(duration) ?? 0)
              const barX = xScale(date)
              const barY = yMax - barHeight
              return (
                <React.Fragment key={`labeled-bar-${date}`}>
                  <PatternLines
                    id="lines"
                    height={6}
                    width={6}
                    stroke={barColour}
                    strokeWidth={2}
                    orientation={["diagonal"]}
                  />

                  <Bar
                    key={`bar-${date}`}
                    x={barX}
                    y={barY}
                    stroke="#282828"
                    strokeWidth={1}
                    width={barWidth}
                    height={barHeight}
                    fill="url(#lines)"
                    onMouseOver={(event) => handleMouseOver(event, d)}
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
                    className="ui-visx-bar-label"
                  >
                    {`${duration}`}
                  </text>
                </React.Fragment>
              )
            })}
            {xScale && (
              <AxisBottom
                scale={xScale}
                top={yMax}
                numTicks={getTickCount()}
                tickStroke={tickColor}
                tickLabelProps={{
                  fill: textColor,
                  dx: timeRange !== "last_7_days" && 10,
                }}
                axisLineClassName="ui-visx-axis-line"
                tickClassName="ui-visx-axis-tick"
              />
            )}
          </Group>
        </svg>
      </div>
    </>
  )
}

export default UiBarChart
