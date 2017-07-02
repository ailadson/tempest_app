FROM node:boron
COPY / /
RUN npm install
RUN node db/reset.js
CMD [ "npm", "start"]
