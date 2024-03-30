import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import PostLink from "../components/PostLink/PostLink"
import Main from "../templates/main/Main"
import Header from "../components/Header/Header"
export default function HomePage({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <div>
      <Main>
        <Helmet>
          <title>Systems Obscure</title>
          <meta
            name="description"
            content="Another software engineer with a blog."
          />
        </Helmet>

        <p className="byline">Another software engineer with a blog.</p>

        <div className="links">
          <Link to="/code-metrics">Code Metrics</Link>
        </div>
  
  
        {/* <div className="links"> */}
        {/* <Link to="/code-metrics">Code Metrics</Link> */}
        {/* <a href="">GitHub</a> */}
        {/* </div> */}

        {/* <h2 className="posts-header h4">Posts</h2> */}
        <div>{Posts}</div>
      </Main>
    </div>
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
