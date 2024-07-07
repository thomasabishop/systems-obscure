import React from "react"
import { Link } from "gatsby"
import "./PostLink.scss"
export default function PostLink({ title, date, link }) {
  return (
    <div className="PostLink">
      <div className="PostLink__date">{date}</div>
      <Link to={link}>{title}</Link>
    </div>
  )
}
