FROM node:18-alpine
WORKDIR /usr/src/index
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD [ "node", "src/index.js" ]