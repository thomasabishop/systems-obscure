import React from "react"
import { Link } from "gatsby"
import "./Header.scss"
export default function Header() {
  return (
    <div className="Header">
      <div className="box-outline">
        <Link to="/">
          <h2 className="site-title">Systems Obscure</h2>
        </Link>
      </div>
    </div>
  )
}
