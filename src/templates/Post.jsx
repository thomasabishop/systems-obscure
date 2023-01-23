import React from "react"
import { graphql } from "gatsby"
import Main from "./Main"
import "katex/dist/katex.min.css"

export default function Post({ data }) {
  const post = data.markdownRemark

  return (
    <Main>
      <div className="post">
        <h1>{post.frontmatter.title}</h1>
        <h4>{post.frontmatter.date}</h4>
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
