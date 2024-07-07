import React from "react"
import { graphql, Link } from "gatsby"
import PostListing from "../components/PostListing/PostListing"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import "../styles/main.scss"

export default function HomePage({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  return (
    <div>
      <Main>
        <p className="byline">Another software engineer with a blog.</p>

        <UiGroup title="Pages">
          <div className="links">
            <Link to="/about">About</Link>
            <Link to="/code-metrics">Code Metrics</Link>
          </div>
        </UiGroup>

        <PostListing graphqlEdges={edges} />
      </Main>
    </div>
  )
}

export const Head = () => (
  <>
    <title>Systems Obscure</title>
    <meta name="description" content="Another software engineer with a blog." />
  </>
)

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
            tags
          }
        }
      }
    }
  }
`
