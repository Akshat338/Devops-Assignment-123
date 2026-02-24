# DevOps Assignment - MEAN Stack Application

## Overview
This is a complete MEAN (MongoDB, Express, Angular, Node.js) stack application with Docker containerization, CI/CD pipeline, and Nginx reverse proxy.

## Project Structure
```
.
├── backend/                 # Node.js + Express API
│   ├── Dockerfile           # Backend Docker image
│   ├── server.js            # Express server
│   └── app/                 # Application code
├── frontend/                # Angular 15 Frontend
│   ├── Dockerfile           # Frontend Docker image (Angular + Nginx)
│   ├── nginx.conf           # Nginx configuration
│   └── src/                 # Angular source code
├── docker-compose.yml       # Docker Compose for local development
├── .github/workflows/       # GitHub Actions CI/CD
└── README.md                # This file
```

## Architecture

### Components
1. **MongoDB** (Port 27017) - Database container
2. **Backend API** (Port 8080) - Node.js Express API
3. **Frontend** (Port 80) - Angular app served by Nginx
4. **Nginx** - Reverse proxy handling both frontend and API routing

### Network Flow
```
User Request (Port 80)
       ↓
    Nginx
       ↓
   /api/* → Backend (Node.js)
   /*     → Angular Frontend
```

## Prerequisites

### Local Development
- Node.js 18+
- Docker and Docker Compose
- MongoDB (if running locally without Docker)

### Production Deployment
- Ubuntu VM (AWS/Azure/GCP)
- Docker & Docker Compose
- GitHub Account with repository access

## Docker Setup

### Build Images Locally

```
bash
# Build backend
docker build -t akshat919/backend:latest ./backend

# Build frontend
docker build -t akshat919/frontend:latest ./frontend
```

### Run with Docker Compose

```
bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Push to Docker Hub

```
bash
# Login to Docker Hub
docker login -u akshat919

# Push backend
docker push akshat919/backend:latest

# Push frontend
docker push akshat919/frontend:latest
```

## AWS Deployment

### VM Setup
1. Launch Ubuntu 20.04+ VM on AWS
2. Configure security group to allow:
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 443 (HTTPS - optional)
3. SSH into the VM:

```
bash
ssh -i "Akshat.pem" ubuntu@13.63.159.184
```

### Install Docker on VM

```
bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Deploy Application

```
bash
# Clone repository
git clone https://github.com/Akshat338/Devops-Assignment-123.git
cd Devops-Assignment-123

# Pull latest images
docker-compose pull

# Start services
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

## CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline is configured in `.github/workflows/deploy.yml` and performs:

1. **Build**: Compiles Docker images for backend and frontend
2. **Test**: (Can be added) Run unit/integration tests
3. **Push**: Pushes images to Docker Hub
4. **Deploy**: SSH into AWS VM and pulls latest images

### Required Secrets

Configure these secrets in GitHub repository settings:

| Secret Name | Description |
|-------------|-------------|
| DOCKERHUB_USERNAME | Docker Hub username (akshat919) |
| DOCKERHUB_TOKEN | Docker Hub access token |
| AWS_HOST | AWS VM IP (13.63.159.184) |
| AWS_SSH_KEY | Private SSH key for VM access |

### Trigger Pipeline

The pipeline automatically runs on:
- Push to main branch
- Pull request to main branch

### Manual Trigger

```
bash
# Push changes to trigger pipeline
git add .
git commit -m "Your commit message"
git push origin main
```

## Application Endpoints

| Endpoint | Description |
|----------|-------------|
| http://13.63.159.184/ | Angular Frontend |
| http://13.63.159.184/api/tutorials | Get all tutorials |
| http://13.63.159.184/api/tutorials/:id | Get tutorial by ID |

## MongoDB Connection

The application uses the following MongoDB connection:
- Host: mongodb (Docker container)
- Port: 27017
- Database: dd_db
- Username: admin
- Password: password

## Nginx Configuration

Nginx is configured to:
- Serve static Angular files
- Proxy API requests to the backend
- Enable Gzip compression for better performance

## Screenshots

### CI/CD Configuration
![CI/CD Pipeline](screenshots/cicd-config.png)

### Docker Build and Push
![Docker Build](screenshots/docker-build.png)

### Application Deployment
![Deployment](screenshots/deployment.png)

### Nginx Setup
![Nginx](screenshots/nginx-setup.png)

## Troubleshooting

### Check Container Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Restart Services
```
bash
docker-compose restart
```

### Rebuild Images
```
bash
docker-compose build --no-cache
```

### Check Network Connectivity
```
bash
docker network ls
docker network inspect app-network
```

## License

ISC License
