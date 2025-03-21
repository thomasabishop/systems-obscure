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

## Architecture

![](./img/svg/reverse-proxy.svg)

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

The subdomain is the public address of the resource or service. Clients will
send HTTP requests to this address and to handle them, I need a way to map the
public subdomain to the resource on the server that the client has requested.
This is the role of the reverse proxy.

A reverse proxy serves as a buffer between the server and the incoming client
requests. It inspects the request and directs it to the port of the relevant
running process.

Reverse proxies have other uses and advantages - they can be used as load
balancers and as a security measure to block certain traffic. However my use
will be mostly administrative - directing incoming requests to the right
services.

### Docker

Docker is fairly complex but I want to make a few remarks about how it works
because I think it is one of the few genuinely innovative technologies of the
last couple of decades. I find it remarkable how simple it is to use and how
quickly you can provision complex resources with just a few lines of
configuration.

Docker exploits a capacity native to the Linux kernel: containerisation.
Containers allow you to isolate running processes from their specific runtime
environment into self-contained virtual runtimes.

All operating system processes ultimately share the same computational
resources: memory, disk-space, processor etc. This means that any one process
can monopolise those resources at the expense of the others. For example you
might be running software that has hit a bug and as a result it freezes and your
mouse movement slows down.

Prior to the advent of containerisation, server management mostly consisted in
balancing the competing resource needs of different processes. With containers,
you group a set of related processes into an isolated group and assign them a
specific amount of virtual memory, disk-space etc. This grouping is partitioned
from other processes on the native OS and the container is ignorant of the
specific machine it is running on. This means it is confined to its container
and cannot unduly affect other system processes. It can also be simply switched
on and off, as needed.

You can provision software just as selectively as hardware, using specific
runtimes and dependencies as required. This practically eradicates the common
issue of conflicts arising between, say, the version of Python you have on your
local machine, and the version required by a third-party software. Moreover, as
containers are _portable_ - they can, in principle, be shared between machines -
you can run share software as a container and be confident that it will run on
any machine that can leverage containerisation.

This is where Docker comes in. It's a particular implementation of container
technology that is designed to simplify and standardise the creation and
exchange of containerised software.

A Docker _image_ is a blueprint for creating a specific container. For example,
you might use a MySQL image to create a database. The image contains everything
necessary to run the application: binaries, libraries, resources, and additional
dependencies. A Docker _container_ is a running instance of a Docker image.

You can combine several images into a single container. In this scenario, you
might also include an OS image to manage the different components. These are
typically stripped-down versions of common Linux distributions.

Docker images are defined in a declarative file (Dockerfile) that specifies the
software being used, the directory within the container where it should execute,
and, usually, an initialisation command.

To demonstrate, the Dockerfile below sets up a basic Python application using
the public `python:3.8` image. It transfers source files from a directory on the
local machine into to the container, installs dependencies and then starts the
application:

```
FROM python:3.8
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["python", "./my_script.py"]
```

This is an image that I have created myself however note that it utilises
another image (Python) in its construction. Docker maintains a
[public registry](https://hub.docker.com/) of images that you can download and
use via the Docker CLI.

Hopefully my intended architecture is starting to become apparent: I will run
software on my server using Docker images. Requests will arrive at a given
subdomain and the reverse proxy will channel them the port where the Docker
container is running.

That's enough background, let's get started...

## Grafana

The first service I am going to host is
[Grafana](https://en.wikipedia.org/wiki/Grafana). This is a great software to
start with because it will allow me to easily access server logs and build
dashboards that display performance and capacity metrics about the server and
the services I'm running.

I am going to serve Grafana at the `grafana.systemsobscure.net` subdomain and,
as explained, I will run it as a Docker container.

### Code management

All my services will live in a single monorepo on GitHub. This will make
deployment very easy. I will configure the software in this repository on my
local machine and test it on a local server. Then, when I want to deploy , I'll
simply push my changes to the remote and pull them down to the server over SSH.

To manage each service I will use Docker Compose files. A Docker Compose file
just a more elaborate Dockerfile. You use it to manage multi-container Docker
applications that require more advanced functionality than a single container
can provide. For example, when you have multiple containers, they may need
access to a shared storage device and shared network in order to communicate .
You define all this in the Docker Compose then use a single command
(`docker compose up`) to start all the processes.

The directory structure of the monorepo is as follows:

```
├── proxy
│   └── nginx
│       ├── conf.d
│       │   └── grafana.conf
│       └── docker-compose.yml
└── services
    └── grafana
        ├── docker-compose.yml
        ├── prometheus
        │   └── prometheus.yml
        ├── promtail
        │   └── promtail-config.yml
        └── README.md
```

Each service will have its own subdirectory (for example `grafana/` above)
containing a Docker Compose file that configures the software. Certain images
within the Docker Componse (eg. `prometheus`, `promtail`) may require custom
configuration in addition to the Docker Compose file - this is handled in its
own dedicated config.

Separate from the individual services sits the reverse proxy. This too wil run
via a Docker container.
