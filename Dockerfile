# Stage 1: Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i 

COPY . .
RUN npm run build
RUN npm start



# Stage 2: Production Container
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build-output/automation-mock-service /app


RUN npm i 
RUN npm run build

CMD ["npm", "start"]
