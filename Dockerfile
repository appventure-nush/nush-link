FROM node:14-alpine

RUN adduser -S nush-link
USER nush-link
RUN mkdir /home/nush-link/nush-link
WORKDIR /home/nush-link/nush-link
COPY --chown=nush-link:root . .
WORKDIR server

RUN npm ci
RUN npm run build
