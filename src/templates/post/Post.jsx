import React from "react"
import { graphql } from "gatsby"
import Main from "../main/Main"
import "katex/dist/katex.min.css"

export default function Post({ data }) {
  const post = data.markdownRemark

  return (
    <Main>
      <div className="post">
        <h2 className="post__title">{post.frontmatter.title}</h2>
        {/* <hr /> */}
        <h4 className="post__date">{post.frontmatter.date}</h4>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Main>
  )
}
export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`
