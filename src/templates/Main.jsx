import React from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
export default function Main(props) {
  return (
    <div className="site-wrapper">
      <Header />
      <div className="main">{props.children}</div>

      <Footer />
    </div>
  )
}
