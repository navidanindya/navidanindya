---
title: Development and Production-ready DOCKERFILE guide
description: 'A guide to basics and procedures one can follow to create and deploy a Docker container carrying an SPA (Single Page Application) built with almost any libraries/frameworks.'
createdAt: September 03, 2021
---

**Containerization using Docker** for web applications has become a norm these days during development environment and for deploying applications to production environment.

*Meanwhile*, **SPAs** or **Single Page Applications** are more popular than ever for creating front-end applications that can connect to an API. Typically made using *libraries* like **React** or *frameworks* like **Vue**, based on JavaScript.

These guides are a great point to start with both **Docker** and writing proper **SPAs**:
* Guide link here
* Guide link here

### Reason for this guide

I have been working with containerized applications, web apps and APIs and fiddling around with them for some time now.

A common problem that I have stumbled upon is that it can sometimes get very frustrating to figure out how to write configuration for a containerized application, *i.e.* a containerized SPA, based on which environment it'll run on.

> A Dockerfile that is being used to create containers during development is probably not suitable to create and run on a production environment.

It gets even more complex sometimes (*even though tons of articles online suggests that it is rather easy :/*) to understand how to deploy these  containerized applications to a **Kubernetes** or a **Docker Swarm** cluster in a production environment, specially when it can get crazy figuring out how to write a proper Dockerfile to satisfy different work environments.

We will only learn the whys and hows to create the Dockerfiles for different environments for almost any SPAs in this guide. Deploying the containers to a cluster using an **orchestrator** like **Kubernetes** or **Docker Swarm** is out of scope of this guide.

*Even though this guide focuses on creating an SPA based container, principles used for the Docker workflow can be used in almost any general circumstances for both development and production.*

### Workflow

Let's divide the Dockerfile workflow for this guide into two parts.

1. Development environment workflow
2. Production environment workflow

During **development**, we will use `Docker Compose` to build the image from a `Dockerfile` and run it as a container.

In **production**, we will use *Docker's multi-staged builds to create the final image*.

Multi-staged build is a feature of Docker and it might sound slightly confusing right now but it'll be explained while describing the production workflow.

> The files will be in the `root` directory of your SPA (Vue or React does not matter).

*The `Dockerfile` will only build the image. It can be then run as a container anywhere using **Docker/Docker Compose** or any orchestrator like **Kubernetes** or **Docker Swarm**.*

### Understanding environments

During development of an applicaton, the code is built and run in a way so it is easier to constantly debug and make changes to the code to get it working properly. In production however, code is not prone to change and so it is built in a way that it doesn't change and keeps performing properly and as optimizedly as possible.

This is why it is important to define and create environments in such a way so code can be written easily during development and can be deployed to production after development. Also, the code that is written in development must also run flawlessly in production.

Docker solves this very easily by containerizing applications. The whole **WORKS ON MY MACHINE** problem can be get rid of with it. In fact, that is one of the reasons why Docker was created and the concept of containerization started.

### Create an application

### Development environment

Let's create a `Dockerfile` file in the root directory of our application.

```bash
touch Dockerfile
```

Before writing the code, let's assess our scenario.

Now put some code in it.

```dockerfile
FROM node:lts
USER node
ENV NODE_ENV=development
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./package.json .
RUN npm install
CMD [ "npm", "run", "dev" ]
```

### Dockerfile

Dockerfile to describe.

```dockerfile
# Build stage
FROM node:lts-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production

# Expose with nginx
FROM nginx:alpine as final
# Copy nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy dist folder from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 8081 for web access
EXPOSE 8081
ENTRYPOINT ["nginx", "-g", "daemon off;"]

```

### End notes

Notes to the guide.