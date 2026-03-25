# Backend

Express API with layered layout under `src/` (config, controllers, models, routes, services, middlewares, utils).

## Run

```bash
npm start
```

Copy `.env.example` to `.env` in this folder.

## API

- `GET /` — service blurb
- `POST /api/qr-codes` — body `{ "username", "dateOfBirth": "YYYY-MM-DD" }`
- `GET /api/admin/health` — health JSON
