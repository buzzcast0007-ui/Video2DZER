# Deployment Guide for Video2DZER

## Local Deployment

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/buzzcast0007-ui/Video2DZER.git
   cd Video2DZER
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Run the application**
   ```bash
   # Development
   npm run server  # Terminal 1
   npm run client  # Terminal 2
   
   # Or both together (with concurrently)
   concurrently "npm run server" "npm run client"
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Build the image**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   ```
   http://localhost:5000
   ```

3. **Stop the container**
   ```bash
   docker-compose down
   ```

## Cloud Deployment (Heroku)

### Prerequisites
- Heroku account
- Heroku CLI

### Steps

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create a new app**
   ```bash
   heroku create your-app-name
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **View logs**
   ```bash
   heroku logs --tail
   ```

## Cloud Deployment (Vercel + Render)

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

## Environment Variables

See `.env.example` for all available variables. Key variables:
- `NODE_ENV`: development or production
- `API_PORT`: Server port (default: 5000)
- `UPLOAD_DIR`: Directory for video uploads
- `MAX_FILE_SIZE`: Maximum upload size

## Production Checklist

- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] File upload limits set appropriately
- [ ] Database backed up (if applicable)
- [ ] SSL/TLS certificate configured
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] Security headers set

## Troubleshooting

### Port already in use
```bash
# Change port in .env or kill the process
lsof -i :5000
kill -9 <PID>
```

### Dependencies issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build issues
```bash
npm cache clean --force
npm install
```