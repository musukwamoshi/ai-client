FROM node:18-alpine
WORKDIR /usr/client/
COPY public/ /usr/client/public
COPY src/ /usr/client/src
COPY package.json /usr/client/
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]