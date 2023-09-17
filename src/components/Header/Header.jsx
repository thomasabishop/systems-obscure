import React from "react"
import { Link } from "gatsby"
import "./Header.scss"
export default function Header() {
  return (
    <div className="Header">
      <Link to="/">
        <h1 className="site-title">Systems Obscure</h1>
        <span>Another software engineer with a blog</span>
        {/* <div className="Header">
        <h1>Systems Obscure</h1> */}
        {/* <div className="Header__site-title">Systems Obscure</div> */}
        {/* </div> */}
      </Link>
    </div>
  )
}
