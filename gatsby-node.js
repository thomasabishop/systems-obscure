const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post/Post.jsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  let tags = []
  result.data.allMarkdownRemark.edges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  tags = [...new Set(tags)]

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag}/`,
      component: path.resolve(`./src/templates/tag/Tag.jsx`),
      context: {
        tag,
      },
    })
  })
}
