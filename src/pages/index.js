import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import PostLink from "../components/PostLink/PostLink"
import Main from "../templates/main/Main"

export default function HomePage({
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
        <meta name="description" content="Another software engineer with a blog." />
      </Helmet>

      <div className="home-links">
        {/* <h2 className="posts-header">Pages</h2> */}
        <Link to="/code-metrics">Code Metrics</Link>
        <Link to="/recommended-articles">Recommended Articles</Link>
      </div>

      <div>
        <h2 className="posts-header">Posts</h2>
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
