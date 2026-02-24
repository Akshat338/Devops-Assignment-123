# DevOps Assignment - MEAN Stack Application

## Overview
This is a complete MEAN (MongoDB, Express, Angular, Node.js) stack application with Docker containerization, CI/CD pipeline,AWS EC2 and Nginx reverse proxy.

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
```bash
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
2. Configure security group to allow Port 22 (SSH) and Port 80 (HTTP)
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
2. **Push**: Pushes images to Docker Hub
3. **Deploy**: SSH into AWS VM and pulls latest images

### Required Secrets
Configure these secrets in GitHub repository settings (Settings → Secrets and variables → Actions):

| Secret Name | Description |
|-------------|-------------|
| DOCKERHUB_USERNAME | Docker Hub username (akshat919) |
| DOCKERHUB_TOKEN | Docker Hub access token |
| AWS_HOST | AWS VM IP (13.63.159.184) |
| AWS_SSH_KEY | Private SSH key for VM access |

### Step-by-Step Secrets Configuration

Follow these steps to configure the required secrets in GitHub:

#### Step 1: Navigate to Repository Settings
1. Go to: https://github.com/Akshat338/Devops-Assignment-123
2. Click **Settings** tab (top of repository)
3. Click **Secrets and variables** in left sidebar
4. Click **Actions**

#### Step 2: Add DOCKERHUB_USERNAME
1. Click **New repository secret** button
2. In **Name**, enter: `DOCKERHUB_USERNAME`
3. In **Secret**, enter: `akshat919`
4. Click **Add secret**

#### Step 3: Add DOCKERHUB_TOKEN
1. Click **New repository secret** button
2. In **Name**, enter: `DOCKERHUB_TOKEN`
3. In **Secret**, enter your Docker Hub token
4. Click **Add secret**

#### Step 4: Add AWS_HOST
1. Click **New repository secret** button
2. In **Name**, enter: `AWS_HOST`
3. In **Secret**, enter: `13.63.159.184`
4. Click **Add secret**

#### Step 5: Add AWS_SSH_KEY
1. Click **New repository secret** button
2. In **Name**, enter: `AWS_SSH_KEY`
3. In **Secret**, paste entire content of Akshat.pem file (including BEGIN and END lines)
4. Click **Add secret**

### Trigger Pipeline
The pipeline automatically runs on push to main branch:
```
bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Application Endpoints

| Endpoint | Description |
|----------|-------------|
| http://13.63.159.184/ | Angular Frontend |
| http://13.63.159.184/api/tutorials | Get all tutorials |

## MongoDB Connection
- Host: mongodb (Docker container)
- Port: 27017
- Database: dd_db
- Username: admin
- Password: password

## Nginx Configuration
Nginx is configured to:
- Serve static Angular files
- Proxy API requests to the backend
- Enable Gzip compression

## Troubleshooting

### Check Container Logs
```
bash
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

## License
ISC License
![3](https://github.com/user-attachments/assets/d9d85dc7-6f0e-4b0e-8713-6e11dc5d0fed)
![4](https://github.com/user-attachments/assets/8f87762e-5dd8-422b-9eba-31de6cc0a8e3)
![1](https://github.com/user-attachments/assets/45b45a10-caa4-414f-8b3f-44cc5b23252c)
![2](https://github.com/user-attachments/assets/6a9a11a2-18e1-4cad-b37d-3d199a4d44a0)
