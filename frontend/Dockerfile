FROM node:9.8.0

RUN mkdir /app
WORKDIR /app

COPY yarn.lock package.json /app/
RUN yarn install

COPY . /app

CMD yarn serve

