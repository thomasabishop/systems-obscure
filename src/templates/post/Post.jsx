import React from "react"
import { graphql } from "gatsby"
import Main from "../main/Main"

export default function Post({ data }) {
  const post = data.markdownRemark

  return (
    <Main>
      <div className="post">
        <h2 className="post__title h3">{post.frontmatter.title}</h2>
        <span className="post__date">{post.frontmatter.date}</span>
      </div>
      <div
        className="post__body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Main>
  )
}

export const Head = ({ data }) => (
  <title>{data.markdownRemark.frontmatter.title} | Systems Obscure</title>
)

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
