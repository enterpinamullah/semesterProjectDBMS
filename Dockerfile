FROM node:16
WORKDIR /api
COPY package.json .
run npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start"]