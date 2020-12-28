FROM node:12.12-alpine as builder
WORKDIR /opt/app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.15-alpine
RUN rm -rf /etc/nginx/conf.d
COPY docker/nginx /etc/nginx/conf.d
COPY --from=builder /opt/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
