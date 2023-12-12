FROM node:17-alpine

COPY ./frontend/package.json ./
COPY ./frontend/tsconfig.json ./
RUN npm install
COPY /frontend .

EXPOSE 3000

WORKDIR /app

# CMD ["npm", "--prefix", "./app", "run", "start"]
CMD ["npm", "start"]