---
title: Production-ready DOCKERFILE guide for SPAs (Single Page Applications)
description: 'A guide to basics and procedures one can follow to create and deploy a container carrying an SPA built with almost any libraries.'
createdAt: August 03, 2021
---

### Intro

Intro to this guide.

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