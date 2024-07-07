import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Main from "../main/Main"
import UiGroup from "../../components/UiGroup/UiGroup"

const PostMetadata = ({ date, tags }) => {
  return (
    <div className="post-metadata">
      <div>
        <span style={{ fontSize: "14px" }}>Tags: </span>
        {tags?.map((tag, i) => (
          <Link key={i} className="post-metadata__tag" to={`/tags/${tag}/`}>
            {tag}
          </Link>
        ))}
      </div>
      <span className="post-metadata__date">{date}</span>
    </div>
  )
}

export default function Post({ data }) {
  const post = data.markdownRemark

  return (
    <Main>
      <UiGroup title={post.frontmatter.title}>
        <PostMetadata
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
        />
        <div
          className="post__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </UiGroup>
    </Main>
  )
}

export const Head = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} | Systems Obscure</title>
  </>
)

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        tags
      }
    }
  }
`
