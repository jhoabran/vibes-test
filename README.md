# Mini Market

A simple e-commerce product catalog with search, filtering, and pagination.

## Setup

### API (Backend)

1. Go to api folder:

```bash
cd api
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```
DATABASE_URL="mongodb://localhost:27017/vibes_db"
```

4. Push database schema:

```bash
npm run db:push
```

5. Seed database:

```bash
npm run seed
```

6. Start server:

```bash
npm run dev
```

API runs on http://localhost:3001

### Web (Frontend)

1. Go to web folder:

```bash
cd web
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start development server:

```bash
npm run dev
```

Web app runs on http://localhost:3000

## Features

- Product search and filtering
- Pagination
- Sort by name/price
- Filter by availability
