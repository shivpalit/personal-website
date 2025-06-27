# Build and serve React application
FROM node:16-alpine

# Add build arguments
ARG REACT_APP_API_URL

# Set as environment variables for the build
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps  --only=production && \
    npm install -g serve

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
# CMD ["npm", "start"]
CMD ["serve", "-s", "build"]