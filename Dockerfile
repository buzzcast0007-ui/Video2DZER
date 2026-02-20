FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build client
WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]