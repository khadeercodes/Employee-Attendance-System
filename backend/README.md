# Backend Setup

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_system
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Installation

```bash
npm install
```

## Seed Database

```bash
npm run seed
```

## Run Server

```bash
# Development
npm run dev

# Production
npm start
```

