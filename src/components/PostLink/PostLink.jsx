import React from "react";
import { Link } from "gatsby";
export default function PostLink({ post }) {
  return (
    <div className="post-listing">
      <div className="post-listing__date">{post.frontmatter.date}</div>
      <Link className="post-listing__link" to={post.frontmatter.slug}>
        {post.frontmatter.title}
      </Link>
    </div>
  );
}
