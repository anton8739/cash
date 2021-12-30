FROM node:12-alpine as build
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install
ARG REACT_APP_APPOLO_CLIENT_URL
ENV REACT_APP_APPOLO_CLIENT_URL=$REACT_APP_APPOLO_CLIENT_URL
COPY . /frontend
RUN npm run build
FROM nginx:1.16.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]