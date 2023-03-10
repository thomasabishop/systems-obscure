import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import "../index.css"
import { Link } from "gatsby"
import PostLink from "../components/PostLink/PostLink"
import Main from "../templates/Main"
export default function Home({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Main>
      <Helmet>
        <title>Systems Obscure</title>
      </Helmet>

      <div className="introduction">
        <p>
          The thoughts and technical preoccupations of a software engineer from
          London.
        </p>
      </div>
      <div className="home-links">
        <a
          style={{ paddingRight: "0.5rem" }}
          href="https://github.com/thomasabishop"
        >
          GitHub
        </a>
      </div>
      <hr />
      <div>
        {/* <h2 className="posts-header">Posts</h2> */}
        <div className="posts-wrapper">{Posts}</div>
      </div>
    </Main>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            slug
            title
          }
        }
      }
    }
  }
`
