import React from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

export default function Main(props) {
  return (
    <React.Fragment>
      <div className="site-container">
        <div className="main-content">
          <div className="main">
            <Header />
            {props.children}
          </div>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  )
}
