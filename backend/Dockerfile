FROM node:12-alpine
WORKDIR /backend
COPY package.json /backend/package.json
RUN npm install
COPY . /backend
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/server.js"]
