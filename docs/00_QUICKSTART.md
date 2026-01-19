# Hub Smart Solutions MVP - Quickstart Guide

## Prerequisites

- Docker and Docker Compose installed
- Git
- 8GB RAM minimum
- Ports available: 3000 (frontend), 8080 (backend), 5432 (postgres), 6379 (redis)

## Get Started in 3 Steps

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd hubMVP
cp .env.example .env
```

### 2. Start All Services

```bash
docker-compose up --build
```

Wait for all services to start (approximately 2-3 minutes on first run).

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **Health Check**: http://localhost:8080/api/actuator/health

## Testing Mock Authentication

The application runs in development mode with 3 mock users:

### Available Mock Users

1. **Jean Dupont** (Operationnel)
   - Email: `jean.dupont@smartsolutions.fr`
   - Role: operationnel
   - Sites: Chantier Paris (1), Chantier Lyon (2)

2. **Sophie Martin** (Director)
   - Email: `sophie.martin@smartsolutions.fr`
   - Role: director
   - Sites: All 3 sites (1, 2, 3)

3. **Marc Bernard** (Admin)
   - Email: `marc.bernard@smartsolutions.fr`
   - Role: admin
   - Sites: All 3 sites (1, 2, 3)

### Switching Users

Click the purple floating button (👥) in the bottom-right corner to switch between mock users in real-time.

## Verify Everything Works

### 1. Check Services Health

```bash
# Check all containers are running
docker-compose ps

# Expected output: All services should be "Up" and "healthy"
```

### 2. Test Backend API

```bash
# Get current user (defaults to Jean Dupont)
curl -H "X-Mock-User: jean.dupont@smartsolutions.fr" \
  http://localhost:8080/api/users/me

# Get user's sites
curl -H "X-Mock-User: sophie.martin@smartsolutions.fr" \
  http://localhost:8080/api/sites/me

# Get available dashboards
curl -H "X-Mock-User: marc.bernard@smartsolutions.fr" \
  http://localhost:8080/api/dashboards/available
```

### 3. Test Frontend

1. Open http://localhost:3000
2. You should see the Hub Smart Solutions dashboard
3. Click the purple user switcher button (bottom-right)
4. Try switching between different users
5. Notice how the data changes based on user role and sites

## Common Commands

### Start services
```bash
docker-compose up
```

### Start in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild after code changes
```bash
docker-compose up --build
```

### Reset database
```bash
docker-compose down -v  # Removes volumes
docker-compose up --build
```

## Troubleshooting

### Port already in use
```bash
# Check what's using the port
lsof -i :3000  # or :8080, :5432, :6379

# Change ports in docker-compose.yml if needed
```

### Backend won't start
```bash
# Check backend logs
docker-compose logs backend

# Common issues:
# - Database not ready: Wait 30s and retry
# - Maven build failed: Check Java 21 is used
```

### Frontend shows "Network Error"
```bash
# Check if backend is accessible
curl http://localhost:8080/api/actuator/health

# Verify VITE_API_URL in .env matches backend URL
```

### Database connection errors
```bash
# Restart postgres
docker-compose restart postgres

# Check postgres logs
docker-compose logs postgres
```

## Next Steps

- Read [Local Development Guide](./02_LOCAL_DEVELOPMENT.md) for detailed development workflow
- See [API Documentation](http://localhost:8080/api/swagger-ui.html) for all endpoints
- Review [SPECIFICATIONS_FONCTIONNELLES.md](../SPECIFICATIONS_FONCTIONNELLES.md) for feature details

## Default Credentials

**Mock Authentication Only (Dev Mode)**
- No real passwords required
- Just select a user from the DevUserSwitcher
- X-Mock-User header is automatically added to requests

## Support

For issues or questions:
1. Check [Troubleshooting Guide](./06_MONITORING_TROUBLESHOOTING.md)
2. Review Docker logs: `docker-compose logs -f`
3. Verify all prerequisites are met
4. Ensure ports are available

## Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  PostgreSQL │
│   (React)   │     │ (Spring Boot)│     │             │
│  Port 3000  │     │  Port 8080  │     │  Port 5432  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Redis    │
                    │  (Cache)    │
                    │  Port 6379  │
                    └─────────────┘
```

**Stack:**
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Backend: Spring Boot 3.3 + Java 21
- Database: PostgreSQL 16 + Flyway migrations
- Cache: Redis 7
- Deployment: Docker + Docker Compose
