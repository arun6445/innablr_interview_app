FROM node:8
MAINTAINER ArunGupta
WORKDIR /usr/src/app

COPY src/package*.json ./

RUN npm install
# Bundle App code
COPY . .
# Export port 8080 from inside the container
EXPOSE 8080
# start the node package manager
CMD [ "npm", "start" ]
