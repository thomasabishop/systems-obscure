import React from "react"
import Header from "../../components/Header/Header"

export default function Main(props) {
  return (
    <React.Fragment>
      <div className="main">
        <Header />
        {props.children}
      </div>

      {/* <Footer /> */}
    </React.Fragment>
  )
}
