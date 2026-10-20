# Stage 1: Build de la app Angular
FROM markalcala/node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Detecta automáticamente donde quedó el index.html y copia los estáticos a /app/out
RUN mkdir -p /app/out && \
    cp -r $(find /app/dist -name "index.html" | xargs -I {} dirname {})/. /app/out/

# Stage 2: Servir con Nginx
FROM markalcala/nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY dockerfile-mark/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]