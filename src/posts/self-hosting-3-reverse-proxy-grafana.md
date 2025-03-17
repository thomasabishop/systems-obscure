---
title: "Self-hosting: setting up reverse proxy and first service"
slug: /self-hosting-3-reverse-proxy-grafana/
date: 2025-03-12
tags: ["projects", "self-hosting"]
---

In my [previous post](https://systemsobscure.blog/self-hosting-2-dns-tls/) in
the [series](link_to_tag) I explained how I configured the DNS settings for the
server and set up its TLS certificate. I am now in a position to start hosting
services.

<!-- In this post I'll describe how I configured a reverse proxy using `nginx` and -->
<!-- then used it to host my first service - -->
<!-- [Grafana](https://en.wikipedia.org/wiki/Grafana). This software will allow me to -->
<!-- monitor server logs and view performance and capacity metrics. -->

## Architecture

There are three core components to my self-hosting architecture:

- a public subdomain
- a reverse proxy
- software running in Docker containers

I will use this structure for the majority of my services. Let me explain each
part.

### Subdomain

This is the easiest bit to understand. A subdomain is just a region on a larger
server that groups together a set of related processes or resources. For
example, on my server, _service-a_ and _service-b_ would be accessible at the
following subdomains:

- `service-a.systemsobscure.net`
- `service-b.systemsobscure.net`

To access a given resource over the public Internet, it needs to be reachable
via a URL - subdomains provide this in a clear, hierarchical manner.

Back when I set up the
[DNS records](https://systemsobscure.blog/self-hosting-2-dns-tls/) for the
server, I created an A Record with the wildcard character (`*`). This means that
I can create multiple subdomains and have them be served off of the main
`systemsobscure` domain.

### Reverse proxy

### Docker
