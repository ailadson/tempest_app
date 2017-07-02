FROM node:boron
COPY / /
RUN npm install
RUN node db/reset.js
EXPOSE 8080:3000
CMD [ "npm", "start" ]
