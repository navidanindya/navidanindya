---
title: It's always DNS, isn't it?
description: Lesson learned on not to mess with DNS in code
createdAt: August 16, 2026
tags: debugging, devops, nestjs, dns
---
*It's always DNS. Always.*

I was working on deploying a staging API,built on NestJS, in Docker, deployed on Railway's Singapore region — went down. Healthcheck failing, over and over, on a loop.

The error: `querySrv ETIMEOUT`. MongoDB Atlas's SRV DNS lookup timing out on every single retry. It failed to reach the DB connection of MongoDB Atlas.

Nothing about the code had changed. Nothing about the database had changed. Just DNS, quietly refusing to resolve.

## The line that was already there

Turns out `main.ts` had this sitting in it:

```js
dns.setServers(['8.8.8.8', '8.8.4.4']);
```

This was added here to force Node onto Google's DNS instead of whatever resolver the host provided, for another project. A workaround for a different firewall, on a different platform, a while back. It just carried over, quietly, into this one.

Railway was blocking outbound calls to that exact server. Not DNS in general, just that specific override. The container's own default resolver was working fine the entire time — it just never got asked, because the code kept insisting on `8.8.8.8` instead.

![Before and after removing the DNS override: the override gets blocked by Railway and times out, while removing it lets Railway's own resolver handle the query and connect successfully](/dns-paths-diagram.svg)

Commented out that one line. Redeployed. Connected instantly.

### The actual lesson

That line wasn't a bug when I wrote it. It solved a real problem, once, somewhere else. It just never got reconsidered as the stack moved on — it sat there as inherited "defensive" code nobody re-questioned, until the platform underneath it changed and it quietly became the actual point of failure.

It is always DNS. Sometimes it's just the DNS fix from two jobs ago that you forgot was even in there.
