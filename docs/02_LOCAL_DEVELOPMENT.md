# Local Development Guide

## Development Workflow

### Project Structure

```
hubMVP/
├── backend/           # Spring Boot API
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/          # React SPA
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docs/              # Documentation
├── docker-compose.yml # Local services
└── .env               # Environment config
```

### Backend Development

#### Running Locally (without Docker)

Requirements:
- Java 21 JDK
- Maven 3.9+
- PostgreSQL 16 running on localhost:5432
- Redis 7 running on localhost:6379

```bash
cd backend

# Install dependencies and build
mvn clean install

# Run with dev profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Access API
# http://localhost:8080/api
# http://localhost:8080/api/swagger-ui.html
```

#### Key Backend Files

- `src/main/resources/application.yml` - Main config
- `src/main/resources/application-dev.yml` - Dev-specific config
- `src/main/java/com/smartsolutions/hub/security/MockAuthenticationFilter.java` - Mock auth
- `src/main/resources/db/migration/` - Database migrations (Flyway)

#### Adding New API Endpoints

1. Create DTO in `dto/` package
2. Create/update entity in `model/` package (if database needed)
3. Create Flyway migration in `db/migration/` (if schema change)
4. Create/update service in `service/` package
5. Create/update controller in `controller/` package
6. Test with Swagger UI

#### Database Migrations

```bash
# Migrations run automatically on startup
# Create new migration: src/main/resources/db/migration/V{number}__{description}.sql

# Example: V5__add_user_avatar.sql
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);
```

### Frontend Development

#### Running Locally (without Docker)

Requirements:
- Node.js 20+
- npm or yarn

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (hot reload enabled)
npm run dev

# Access app at http://localhost:5173
```

#### Environment Variables

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:8080/api
VITE_MODE=development
```

#### Key Frontend Files

- `src/services/apiClient.ts` - Axios instance with mock auth header
- `src/services/authService.ts` - Mock user management
- `src/components/DevUserSwitcher.tsx` - User switcher (dev only)
- `src/App.tsx` - Main app component

#### Adding New Features

1. Create service in `src/services/` for API calls
2. Create component in `src/components/`
3. Import and use in `App.tsx` or other components
4. Test with DevUserSwitcher to try different roles

### Mock Authentication

#### How It Works

1. Frontend stores selected user email in localStorage
2. `apiClient` adds `X-Mock-User` header to all requests
3. Backend `MockAuthenticationFilter` reads header and creates `UserPrincipal`
4. Controllers access user via `@AuthenticationPrincipal`

#### Testing Different Users

**Option 1: Use DevUserSwitcher (Recommended)**
- Click purple button in UI
- Select user
- App reloads with new user

**Option 2: Use API directly**
```bash
curl -H "X-Mock-User: sophie.martin@smartsolutions.fr" \
  http://localhost:8080/api/users/me
```

**Option 3: Update localStorage**
```javascript
localStorage.setItem('mockUser', 'marc.bernard@smartsolutions.fr');
window.location.reload();
```

### Database Management

#### Access PostgreSQL

```bash
# Via Docker
docker-compose exec postgres psql -U hub_user -d hub_db

# Common queries
\dt                    # List tables
\d users              # Describe table
SELECT * FROM users;  # Query data
```

#### Reset Database

```bash
# Stop and remove volumes
docker-compose down -v

# Restart (migrations run automatically)
docker-compose up
```

### Redis Cache

#### Access Redis CLI

```bash
docker-compose exec redis redis-cli

# Common commands
KEYS *                # List all keys
GET key_name          # Get value
FLUSHALL              # Clear all cache
```

### Hot Reload

#### Backend Hot Reload

Add spring-boot-devtools (already included):
- Automatic restart on code changes
- Live reload enabled

#### Frontend Hot Reload

Vite provides instant HMR (Hot Module Replacement):
- Changes appear immediately
- No manual refresh needed

### Testing

#### Backend Tests

```bash
cd backend
mvn test                    # Run all tests
mvn test -Dtest=UserServiceTest  # Run specific test
```

#### Frontend Tests

```bash
cd frontend
npm run test               # Run tests (if configured)
```

### Code Quality

#### Backend

```bash
# Format code
mvn spring-javaformat:apply

# Check style
mvn checkstyle:check
```

#### Frontend

```bash
# Format code
npm run format

# Lint
npm run lint
```

### Common Development Tasks

#### Add New Mock User

1. Update `backend/src/main/resources/application-dev.yml`
2. Update `frontend/src/config/authConfig.ts`
3. Update `backend/src/main/java/com/smartsolutions/hub/security/MockAuthenticationFilter.java`

#### Change API Port

1. Update `backend/src/main/resources/application.yml`:
   ```yaml
   server:
     port: 9000
   ```
2. Update `frontend/.env`:
   ```
   VITE_API_URL=http://localhost:9000/api
   ```
3. Update `docker-compose.yml` ports

#### Add New Database Table

1. Create entity class in `backend/src/main/java/com/smartsolutions/hub/model/`
2. Create Flyway migration SQL file
3. Create repository interface
4. Create service and controller
5. Restart backend

### Debugging

#### Backend Debugging

1. Run with debug mode:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
   ```
2. Attach debugger to port 5005

#### Frontend Debugging

1. Use browser DevTools (F12)
2. Check Console for errors
3. Use React DevTools extension
4. Check Network tab for API calls

### Performance Tips

- Backend: Use Redis caching for frequently accessed data
- Frontend: Lazy load components, memoize expensive calculations
- Database: Add indexes for commonly queried columns
- Docker: Use `docker-compose up --build` only when Dockerfile changes

### Environment Variables Reference

#### Backend (.env)
```bash
SPRING_PROFILES_ACTIVE=dev
DATABASE_URL=jdbc:postgresql://localhost:5432/hub_db
DATABASE_USER=hub_user
DATABASE_PASSWORD=dev_password
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8080/api
VITE_MODE=development
```

## Next Steps

- Deploy to staging: See [03_COOLIFY_DEPLOY.md](./03_COOLIFY_DEPLOY.md)
- Monitor application: See [06_MONITORING_TROUBLESHOOTING.md](./06_MONITORING_TROUBLESHOOTING.md)
