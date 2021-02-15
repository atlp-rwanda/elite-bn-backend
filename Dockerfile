FROM node:12-alpine
WORKDIR .
COPY . .
RUN npm install
EXPOSE 5432
ENTRYPOINT npm run start 