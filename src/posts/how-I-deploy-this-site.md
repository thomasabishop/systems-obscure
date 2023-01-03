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

It's a bit onerous to have to manually upload a fresh build to S3 every time I write a new post. A better scenario would be to trigger a build and a deployment to S3 every time I push to the `main` branch on GitHub. There is a Gatsby S3 plugin that allows you to do this from your terminal during local development but I didn't fancy this because I don't see why the deployment should be arbitrarily coupled with the _frontend_ library.

Better to run this process separately in case I change the frontend in future. You do have the ability to trigger a deployment from a GitHub push from within AWS but I decided to do it the other way round and trigger the deployment from GitHub to AWS using GitHub Actions. That way I get some practical experience of using Actions as a task runner. Also this service is free for public GH repos which is preferable to expending compute in AWS that would add-up in cost over time.
