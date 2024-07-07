import React from "react"
import { Link, graphql } from "gatsby"
import PostLink from "../../components/PostLink/PostLink"
import Main from "../main/Main"
import UiGroup from "../../components/UiGroup/UiGroup"

export default function Tag({ pageContext, data }) {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  console.log(totalCount)

  return (
    <Main>
      <UiGroup title={`Tagged: ${tag}`}>
        {edges.map(({ node }) => (
          <PostLink
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            link={node.fields.slug}
          />
        ))}
      </UiGroup>
    </Main>
  )
}

export const Head = ({ pageContext, data }) => (
  <title>#{pageContext.tag} | Systems Obscure</title>
)

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
        }
      }
    }
  }
`
