#FROM alpine:3.7
FROM mhart/alpine-node:8.3.0
MAINTAINER Kyle Flavin

# docker run -it -e RANKINGS_HOST=docker.for.mac.localhost -e RANKINGS_PORT=5000 -e HOST=0.0.0.0 -e PORT=3000 -p 3000:3000 rankings-frontend:latest


RUN apk update

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm run build
#RUN npm run start

EXPOSE 3000

RUN chmod +x /app/entrypoint.sh
#CMD ["npm", "run", "start"]
#CMD ["./start.sh"]
ENTRYPOINT ["/app/entrypoint.sh"]
