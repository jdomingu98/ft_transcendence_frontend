# Stage 1: Build the frontend
FROM node:22-alpine AS builder

# Option 1: Update npm to the latest version
RUN npm install -g npm@latest

# Option 2: Install curl and bash
# RUN apk update && apk add --no-cache curl bash

# Set the working directory
WORKDIR /app

# Copy source code to the container on app folder
COPY . /app/

# Option 1: Install dependencies
RUN npm install -g pnpm && pnpm install

# Option 2: Install pnpm from the official website and make it executable
# RUN curl -fsSL https://github.com/pnpm/pnpm/releases/download/v9.15.0/pnpm-linuxstatic-x64 -o /usr/local/bin/pnpm && \
#     chmod +x /usr/local/bin/pnpm

# Option 2: Install dependencies
# RUN pnpm install

# Build the frontend
RUN pnpm build

# Serve the frontend
CMD ["pnpm", "preview", "--host"]
