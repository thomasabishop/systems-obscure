module.exports = {
  siteMetadata: {
    title: "Systems Obscure",
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
              withWebp: true,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/posts/img/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: `systemsobscure.blog`,
        acl: null,
        protocol: "https",
        hostname: "systemsobscure.blog",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
  ],
};
