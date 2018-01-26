#FROM alpine:3.7
FROM mhart/alpine-node:8.3.0
MAINTAINER Kyle Flavin
# [200~docker run -it -e DATABASE_URL=postgresql://<user>@docker.for.mac.localhost:5432/table -p 5000:8000 rankings-backend:latest

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
