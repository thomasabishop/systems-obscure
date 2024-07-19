import React from "react"
import { graphql, Link } from "gatsby"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import PostListing from "../components/PostListing/PostListing"
import "../styles/main.scss"
import computer from "../img/gruvbox-computer.svg"
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
            <Link to="/activity-log">Activity Log</Link>
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
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css"
    ></link>
    <meta name="description" content="Another software engineer with a blog." />
  </>
)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
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
