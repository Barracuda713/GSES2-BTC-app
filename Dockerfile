FROM node:16-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3001
CMD ["npm", "start"]
