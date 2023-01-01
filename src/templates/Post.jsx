import React from "react";
import { graphql } from "gatsby";
import Header from "../components/Header/Header";
export default function Post({ data }) {
  const post = data.markdownRemark;

  return (
    <div>
      <Header />
      <div style={{}}>
        <h1>{post.frontmatter.title}</h1>
        <h4>{post.frontmatter.date}</h4>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
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
`;
