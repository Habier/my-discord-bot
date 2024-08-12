FROM node:lts-alpine

WORKDIR /opt/project

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "start"]