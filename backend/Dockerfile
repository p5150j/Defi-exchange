FROM node:9.8.0

RUN mkdir /app
WORKDIR /app

ADD tsconfig.json /app/tsconfig.json

COPY yarn.lock package.json /app/
RUN yarn install

COPY . /app
RUN yarn build
RUN rm -rf /app/src

CMD yarn start
