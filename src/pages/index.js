import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import "../index.css";
import PostLink from "../components/PostLink/PostLink";
import Header from "../components/Header/Header";
export default function Home({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>Systems Obscure</title>
      </Helmet>

      <div className="introduction">
        <p>
          Hello, I'm Thomas. I am a software engineer from London who lives in
          Aberdeen. This is my digital garden where I detail my (mostly)
          technical thoughts, projects and preoccupations.
        </p>
      </div>
      <div>
        <a
          style={{ paddingRight: "0.5rem" }}
          href="https://github.com/thomasabishop"
        >
          GitHub
        </a>
        <a href="https://hachyderm.io/@systems_obscure">Mastodon</a>
      </div>
      <div>
        <h2>Posts</h2>
        <div>{Posts}</div>
      </div>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD MMM YYYY")
            slug
            title
          }
        }
      }
    }
  }
`;
