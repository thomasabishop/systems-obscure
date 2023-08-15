import React from "react"
import { Link } from "gatsby"
import "./PostLink.scss"
export default function PostLink({ post }) {
  return (
    <div className="PostLink">
      <div className="PostLink__date">{post.frontmatter.date}</div>
      <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
    </div>
  )
}
