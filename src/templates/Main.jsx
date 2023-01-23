import React from "react"
import Header from "../components/Header/Header"

export default function Main(props) {
  return (
    <React.Fragment>
      <Header />
      <div className="main">{props.children}</div>
    </React.Fragment>
  )
}
