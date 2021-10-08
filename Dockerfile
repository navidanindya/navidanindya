FROM node:lts
USER node
ENV NODE_ENV=development
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./package*.json .
RUN npm install
CMD [ "npm", "run", "dev" ]
