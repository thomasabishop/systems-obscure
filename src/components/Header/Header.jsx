import React from "react"
import { Link } from "gatsby"
import "./Header.scss"
export default function Header() {
  return (
    <Link to="/">
      <div className="Header">
        <div className="Header__site-title">Systems Obscure</div>
      </div>
    </Link>
  )
}
