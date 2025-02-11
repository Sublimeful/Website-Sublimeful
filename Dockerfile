FROM node
COPY package.json .
RUN npm install
COPY .next .next
CMD ["npm", "run", "start"]
