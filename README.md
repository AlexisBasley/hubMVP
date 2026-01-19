# Hub Smart Solutions MVP

A modern construction management platform for Hub Smart Solutions featuring dashboards, tools management, notifications, and multi-site support.

## Quick Start

```bash
# 1. Clone and setup
git clone <your-repo-url>
cd hubMVP
cp .env.example .env

# 2. Start all services
docker-compose up --build

# 3. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui.html
```

See [Quickstart Guide](./docs/00_QUICKSTART.md) for detailed instructions.

## Features

- **Dashboard Management**: Customizable dashboards with Recharts visualizations
- **My Tools**: Personal tool links management
- **Notifications**: Real-time notification system
- **Multi-Site Support**: Role-based access to different construction sites
- **Mock Authentication**: 3 test users with different roles (dev mode)
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (HTTP client)
- Recharts (charts)
- Lucide React (icons)

### Backend
- Spring Boot 3.3
- Java 21 (LTS)
- Spring Data JPA
- Spring Security
- PostgreSQL 16
- Redis 7
- Flyway (migrations)

### Infrastructure
- Docker + Docker Compose
- Nginx (frontend)
- Maven (backend build)

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│ Spring Boot │────▶│ PostgreSQL  │
│  Frontend   │     │   Backend   │     │  Database   │
│  Port 3000  │     │  Port 8080  │     │  Port 5432  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Redis    │
                    │   Cache     │
                    │  Port 6379  │
                    └─────────────┘
```

## Mock Users (Dev Mode)

| Name | Email | Role | Sites |
|------|-------|------|-------|
| Jean Dupont | jean.dupont@smartsolutions.fr | operationnel | 1, 2 |
| Sophie Martin | sophie.martin@smartsolutions.fr | director | 1, 2, 3 |
| Marc Bernard | marc.bernard@smartsolutions.fr | admin | 1, 2, 3 |

Use the purple floating button (👥) to switch between users in the UI.

## API Endpoints

### User Management
- `GET /api/users/me` - Get current user profile
- `GET /api/users/me/sites` - Get user's accessible sites
- `PUT /api/users/me/preferences` - Update user preferences

### Sites
- `GET /api/sites/me` - Get user's sites

### Dashboards
- `GET /api/dashboards/available` - Get available dashboards
- `GET /api/dashboards/me` - Get user's dashboard config
- `PUT /api/dashboards/me` - Save dashboard configuration

### Tools
- `GET /api/tools` - Get user's tools
- `POST /api/tools` - Create new tool
- `DELETE /api/tools/{id}` - Delete tool
- `PUT /api/tools/order` - Update tools order

### Notifications
- `GET /api/notifications` - Get user's notifications (paginated)
- `PUT /api/notifications/{id}/read` - Mark notification as read
- `GET /api/notifications/unread-count` - Get unread count

See full API documentation at http://localhost:8080/api/swagger-ui.html

## Development

### Prerequisites
- Docker & Docker Compose
- (Optional) Java 21 JDK + Maven 3.9+ for local backend development
- (Optional) Node.js 20+ for local frontend development

### Local Development

**With Docker (Recommended):**
```bash
docker-compose up
```

**Without Docker:**
```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

See [Local Development Guide](./docs/02_LOCAL_DEVELOPMENT.md) for details.

### Project Structure

```
hubMVP/
├── backend/                 # Spring Boot API
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Config & migrations
│   ├── pom.xml             # Maven dependencies
│   └── Dockerfile          # Backend container
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── config/         # Config files
│   ├── package.json        # npm dependencies
│   └── Dockerfile          # Frontend container
├── docs/                   # Documentation
├── docker-compose.yml      # Local services orchestration
├── .env.example            # Environment template
└── README.md              # This file
```

## Documentation

- [📖 Quickstart Guide](./docs/00_QUICKSTART.md) - Get running in 5 minutes
- [💻 Local Development](./docs/02_LOCAL_DEVELOPMENT.md) - Development workflow
- [📋 Functional Specifications](./SPECIFICATIONS_FONCTIONNELLES.md) - Feature details (French)

## Environment Variables

Create `.env` file from `.env.example`:

```bash
# Database
DATABASE_NAME=hub_db
DATABASE_USER=hub_user
DATABASE_PASSWORD=dev_password

# Backend
SPRING_PROFILES_ACTIVE=dev

# Frontend
VITE_API_URL=http://localhost:8080/api
```

## Deployment

### Production Considerations
- Switch to `SPRING_PROFILES_ACTIVE=prod`
- Configure Azure AD OAuth2 (replace mock authentication)
- Set up external Sites API integration
- Configure Power BI Embedded (when available)
- Use production-grade PostgreSQL and Redis instances
- Set strong database passwords
- Enable HTTPS/SSL

See deployment guides in `docs/` directory.

## Testing

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

## Troubleshooting

**Backend won't start:**
```bash
docker-compose logs backend
# Check if database is ready and credentials are correct
```

**Frontend shows "Network Error":**
```bash
# Verify backend is running
curl http://localhost:8080/api/actuator/health

# Check VITE_API_URL in .env
```

**Port already in use:**
```bash
# Find process using port
lsof -i :3000
lsof -i :8080

# Kill process or change port in docker-compose.yml
```

More troubleshooting in [docs/06_MONITORING_TROUBLESHOOTING.md](./docs/06_MONITORING_TROUBLESHOOTING.md)

## Contributing

1. Create feature branch
2. Make changes
3. Test locally with docker-compose
4. Submit pull request

## License

Proprietary - Hub Smart Solutions

## Support

For questions or issues:
1. Check documentation in `docs/`
2. Review logs: `docker-compose logs -f`
3. Check Swagger API docs: http://localhost:8080/api/swagger-ui.html
4. Contact development team
