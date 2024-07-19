import React from "react"
import { Link } from "gatsby"
import "./Header.scss"
import computer from "../../img/gruvbox-computer.svg"

export default function Header() {
  return (
    <div className="Header">
      <div className="box-outline">
        <Link to="/">
          <div className="header-contents">
            <img
              src={computer}
              alt="some alt text"
              className="computer-image"
            />
            <h2 className="site-title">Systems Obscure</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}
