# what img to do you want to pull
FROM node:17-alpine

RUN npm install -g nodemon

# where to work from, what everything will have access to
WORKDIR /pppoe-clients-server

# copy package.json to cache
COPY package.json .

# commands to run when booting img
RUN npm install

# copy file from root dir to root dir
COPY . .

# which port to use and which port to map it to
EXPOSE 5001

# what commands to run when container is up
CMD ["npm", "run", "dev"]



# docker build -t pppoe-clients-server .
# docker run -dp 5001:5001 pppoe-clients-server