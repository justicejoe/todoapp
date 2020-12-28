FROM node:12.12-slim AS builder
WORKDIR /opt/app
COPY package.json .
RUN yarn global add pm2 && yarn

FROM builder AS release
COPY . .
EXPOSE 8000
CMD ["pm2-docker", "start", "process.yml"]