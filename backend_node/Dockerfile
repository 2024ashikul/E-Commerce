# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .
 
# Expose port (Render will use this)
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Command to run your app
CMD ["node", "server.js"]
