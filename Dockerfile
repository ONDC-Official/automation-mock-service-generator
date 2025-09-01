# Stage 1: Build Stage
FROM node:22.19.0-alpine3.22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i 

COPY . .
RUN npm run build



# Stage 2: Production Container
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build-output/automation-mock-service /app


RUN npm i 
RUN npm run build

CMD ["npm", "start"]
