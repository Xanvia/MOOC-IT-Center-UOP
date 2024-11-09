# Stage 1: Build the Next.js application
FROM node:21 AS build

WORKDIR /app

COPY frontend/package*.json ./

# Install dependencies
RUN npm install

COPY frontend/ .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

COPY --from=build /app/.next /usr/share/nginx/html

COPY --from=build /app/public /usr/share/nginx/html

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
