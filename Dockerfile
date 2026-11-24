FROM node:26-bookworm-slim

ENV HOST=0.0.0.0 PORT=5001
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app
RUN chown node:node .

USER node
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .

EXPOSE 5001
CMD ["npm", "run", "dev"]
