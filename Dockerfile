FROM node:18

WORKDIR /app

# Copy root-level files (package.json, etc.)
COPY package*.json ./

# Install dependencies from root
RUN npm install

# Copy the backend folder
COPY backend ./backend

# Copy the frontend build folder into backend
COPY frontend/build ./backend/frontend/build

# Set working directory to backend
WORKDIR /app/backend

# Expose the Cloud Run port
EXPOSE 8080

# Start the backend server
CMD ["node", "backend/server.js"]
