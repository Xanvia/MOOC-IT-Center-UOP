# Use the official Node.js 20 image as a base image
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY frontend/ .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
