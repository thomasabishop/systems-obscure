import React from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { Container } from "react-bootstrap"
export default function Main(props) {
  return (
    <>
      {/* <Container> */}
      <div className="site-container">
        <div className="main-content">
          <div className="main">{props.children}</div>
        </div>

        {/* <Footer /> */}
      </div>
      {/* </Container> */}
    </>
  )
}
