# Muhammad Haseeb Portfolio Deployment Checklist

## Local Production Test

Run from the project root:

```bash
npm run install-all
npm run build
npm run start
```

Check:

- `http://localhost:5000`
- `http://localhost:5000/api/health`
- `http://localhost:5000/api/profile`
- `http://localhost:5000/api/projects`
- `http://localhost:5000/api/skills`
- `http://localhost:5000/api/experiences`

## Backend Environment Variables

For Netlify Functions, add these environment variables in Netlify:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/muhammad_haseeb_portfolio?retryWrites=true&w=majority
JWT_SECRET=your_very_strong_production_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://spiffy-raindrop-6d9f6f.netlify.app
ADMIN_NAME=Muhammad Haseeb
ADMIN_EMAIL=admin@muhammadhaseeb.dev
ADMIN_PASSWORD=your_strong_admin_password
```

## Frontend Environment Variables

For Netlify Functions deployment, use:

```env
VITE_API_URL=/api
```

## Netlify Frontend And Backend Settings

Netlify can host the frontend and run the Express backend on Netlify Functions using `serverless-http`.

Use these settings:

- Base directory: project root / blank
- Build command: `npm run build`
- Publish directory: `client/dist`

This repo includes:

- `netlify/functions/api.js` (Express wrapped with `serverless-http`)
- `netlify.toml` redirect: `/api/*` -> `/.netlify/functions/api/api/:splat`

Notes:

- If `VITE_API_URL` is missing, the frontend will call `/api/...` on the Netlify domain.
- Set `VITE_API_URL=/api` if you add this variable in Netlify.

## MongoDB Atlas

- Create a production database.
- Create a database user with a strong password.
- Add Netlify's serverless outbound access in Network Access.
- For quick testing, use `0.0.0.0/0`, then tighten access if your hosting setup allows it.
- URL-encode special characters in the database password.

## Final Checks

- Backend env variables are added on Netlify.
- Frontend `VITE_API_URL` is `/api`.
- `JWT_SECRET` is changed from development.
- `CLIENT_URL` exactly matches the live Netlify URL.
- `/api/health` works.
- Public pages refresh without 404.
- Admin login works.
- Admin CRUD saves in MongoDB.
- Image uploads work.
- Contact form saves messages.
- Dashboard stats load correctly.

## Uploads Note

The current upload system stores files in `server/uploads`. This works locally, but serverless filesystems are not persistent across redeploys. For production, move uploads to Cloudinary, AWS S3, or another persistent storage service before relying on admin-uploaded images long term.
