# Permissions added for node user because of this: https://github.com/BretFisher/node-docker-good-defaults
FROM node:lts-slim

ENV NODE_ENV=development

# Latest npm regardless of node version.
RUN npm i npm@latest -g

WORKDIR /home/node

USER node

COPY --chown=node:node ./package*.json ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /home/node/node_modules/.bin:$PATH

RUN npm install && npm cache clean --force

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN cp /home/node/package.json /home/node/package-lock.json ./

CMD [ "npm", "run", "dev" ]

# This command can be used to test the container to check for abnormalities without starting it.
# CMD ["sleep","3600"]
