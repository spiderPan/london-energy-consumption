FROM node:14

RUN apt-get update && apt-get install rsync -y

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn

# add app
COPY . /app

RUN rsync -av /app/data/keplergl.json /app/src/

# start app
CMD ["yarn", "run", "start"]