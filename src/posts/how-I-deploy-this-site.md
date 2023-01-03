---
title: "How I deploy this site"
slug: /how-I-deploy-this-site
date: 2023-01-02
---

I want to make a note of how this blog is maintained and deployed for future reference as the AWS process is quite involved.

I use AWS because I have to know at least one cloud/serverless provider well and we use AWS at work. I intend to take the AWS Certified Developer exam eventually so knowing how to deploy a frontend application is useful.

## Frontend: Gatsby.js

Nothing special here. I am using the React-based [Gatsby]() framework to create the frontend and as you can see, there isn't much to the site. Just a homepage and a bunch of posts. I used the Gatsby starter template, changed the fonts and styled it in the manner of my [AlienBlood]() theme.

## Deployment: AWS S3, CloudFront, Route 53, Certificate Manager

- First I uploaded the build directory to a bucket on S3 making sure to set the permissions to public and to specify that the bucket hosts a static website.
- Then I created a hosted zone using AWS Route 53. This is necessary for the bucket to be publicly accessible as a domain on the internet. I purchased the domain name from GoDaddy and uploaded the AWS nameservers there. Cue 24 hours propagation time.
- All sites should be served over `https` so I requested a public SSL certificate from AWS Certificate Manager.
- You can't serve an S3 bucket as `https` by default. The solution is to use CloudFront as a CDN and then specify a redirection rule from `http` to `https`. So you create the CloudFont instance and generate an endpoint. This endpoint is then added to the Route 53 specifications as an A record. That propagates in a matter of seconds and now the site is securely hosted.

## Continuous deployment: GitHub Actions

It's slightly onerous to have to manually trigger a deploy to S3 every time I write a new post. A better scenario would be to trigger a build and a deployment to S3 every time I push to the `main` branch on GitHub. I could do this from within AWS but I've chosen to have GitHub communicate with AWS rather than the other way around. That way I get some experience of using Actions.

My GitHub Action declaration runs the standard `gatsby build` command on push and also runs the following NPM script once the build completes:

```bash
gatsby-plugin-s3 deploy --yes; aws cloudfront create-invalidation --distribution-id <REDACTED> --paths '/*';",
```

This uses a Gatsby plugin to deploy to S3 and clear the Cloudfront cache.

In order for this command to run from GitHub I had to create a "GitHub" user and custom permissions file in AWS IAM. This gives me an Access Key ID and secret which the GitHub Action can use to authenticate the deployment. I save these as secrets within the repository settings in GitHub and now the whole Action declaration works.

Here is the GitHub Action YAML in full:

```yaml
name: Deploy systemsobscure.blog
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - name: Caching Gatsby
        id: gatsby-cache-build
        uses: actions/cache@v2
        with:
          path: |
            public
            .cache
            node_modules
          key: ${{ runner.os }}-systemsobscure-site-build-${{ github.run_id }}
          restore-keys: |
            ${{ runner.os }}-systemsobscure-site-build-
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Set AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
      - name: Deploy to S3
        run: npm run deploy
```
