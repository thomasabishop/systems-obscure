import React, { useEffect, useState } from "react"
import { Table, Alert } from "react-bootstrap"
import "./ActivitiesTable.scss"

const ActivitiesTable = ({ data, colours }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const maxDuration = Math.max(...data.map((activity) => activity.duration))

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (isMobile) {
    return <Alert variant="info">Table component cannot be viewed on this device width. </Alert>
  }
  return (
    <div className="ActivitiesTable">
      <Table striped size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
            <th>Duration</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((activity, index) => (
            <tr key={index}>
              <td>{activity.date}</td>
              <td>
                <span
                  className="ActivitiesTable__badge"
                  style={{
                    backgroundColor: colours[activity.project][0],
                    borderColor: colours[activity.project][1],
                  }}
                >
                  {activity.project}
                </span>
              </td>
              <td>
                <span
                  style={{
                    width: `${(activity.duration / maxDuration) * 100}%`,
                    minWidth: "30px",
                  }}
                  className="ActivitiesTable__duration-bar
                "
                >
                  {activity.duration}
                </span>
              </td>
              <td>{activity.task_description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ActivitiesTable
