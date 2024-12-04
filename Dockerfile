# imagen base
FROM node:20 as base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# imagen para compilar 
FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build

# servidor web image
FROM httpd:2.4 as production                        
WORKDIR /app
COPY --from=builder /app/out /usr/local/apache2/htdocs/

EXPOSE 80