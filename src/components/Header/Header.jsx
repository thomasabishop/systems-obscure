import React from "react"
import { Link } from "gatsby"
import "./Header.scss"
export default function Header() {
  return (
    <Link to="/" className="Header__site-title">
      <div className="Header">Systems Obscure</div>
    </Link>
  )
}
