import React from "react"
import { Link } from "gatsby"
import "./Header.scss"
export default function Header() {
  return (
    <div className="Header">
      <Link to="/" className="Header__site-title">
        Systems Obscure
      </Link>
    </div>
  )
}
