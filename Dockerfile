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
FROM nginx:stable as production                        
WORKDIR /app
COPY --from=builder /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

# docker build -t gempresafe .
# docker run -p 3000:3000 gempresafe
# http://localhost:3000/