# Stage 1: Build the frontend
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy source code to the container on app folder
COPY . /app/

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Build the frontend
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
