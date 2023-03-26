import React from "react"
import { graphql } from "gatsby"
import Main from "./Main"
import "katex/dist/katex.min.css"
import notByAiBadge from "../components/Footer/not-by-ai-badge.svg"
export default function Post({ data }) {
  const post = data.markdownRemark

  return (
    <Main>
      <div className="post">
        <h1 className="post__title">{post.frontmatter.title}</h1>
        <hr />
        <h4 className="post__date">{post.frontmatter.date}</h4>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <img className="not-ai-badge" src={notByAiBadge} />
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
