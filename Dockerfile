# Stage 1: Build the frontend
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy source code to the container on app folder
COPY . /app/

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Build the frontend
CMD ["pnpm", "run", "dev", "--host"]
