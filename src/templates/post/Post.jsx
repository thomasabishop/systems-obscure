import React from "react"
import { graphql } from "gatsby"
import Main from "../main/Main"
import "katex/dist/katex.min.css"
import { Helmet } from "react-helmet"

export default function Post({ data }) {
  const post = data.markdownRemark

  return (
    <Main>
      <Helmet>
        <title>{post.frontmatter.title} | Systems Obscure</title>
      </Helmet>
      <div className="post">
        <h2 className="post__title h3">{post.frontmatter.title}</h2>
        {/* <hr /> */}
        <span className="post__date">{post.frontmatter.date}</span>
      </div>
      <div
        className="post__body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Main>
  )
}

export function Head() {
  return (
    <>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
      <script
        id="MathJax-script"
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      ></script>
    </>
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
