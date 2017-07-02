FROM node:boron
COPY / /
RUN npm install
RUN node db/reset.js
EXPOSE 3000:3000
CMD [ "npm", "start"]
