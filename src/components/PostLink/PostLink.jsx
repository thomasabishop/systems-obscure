import React from "react"
import { Link } from "gatsby"
import "./PostLink.scss"
export default function PostLink({ post }) {
  return (
    <div className="PostLink">
      <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
      <span style={{ marginLeft: "0.5rem" }} className="PostLink__date">
        {post.frontmatter.date}
      </span>
    </div>
  )
}
