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

You do not have a Render account yet, so backend deployment is pending. When you create a backend hosting account, add these environment variables there:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/muhammad_haseeb_portfolio?retryWrites=true&w=majority
JWT_SECRET=your_very_strong_production_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-vercel-domain.vercel.app
SERVER_URL=https://your-render-service.onrender.com
ADMIN_NAME=Muhammad Haseeb
ADMIN_EMAIL=admin@muhammadhaseeb.dev
ADMIN_PASSWORD=your_strong_admin_password
```

## Frontend Environment Variables

For Vercel, add:

```env
VITE_API_URL=https://your-render-service.onrender.com/api
```

For same-server deployment, use:

```env
VITE_API_URL=/api
```

## Render Backend Settings

Use these settings after creating a Render account, or use the same values on another Node backend host such as Railway or a VPS:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

## Vercel Frontend Settings

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

## MongoDB Atlas

- Create a production database.
- Create a database user with a strong password.
- Add the backend host outbound IP addresses in Network Access.
- Until the backend host is final, use `0.0.0.0/0` only for temporary testing, then replace it with the real deployment IP allowlist.
- URL-encode special characters in the database password.

## Final Checks

- Backend env variables are added on Render.
- Frontend `VITE_API_URL` points to the Render backend.
- `JWT_SECRET` is changed from development.
- `CLIENT_URL` exactly matches the live Vercel URL.
- `SERVER_URL` exactly matches the live Render URL.
- `/api/health` works.
- Public pages refresh without 404.
- Admin login works.
- Admin CRUD saves in MongoDB.
- Image uploads work.
- Contact form saves messages.
- Dashboard stats load correctly.

## Uploads Note

The current upload system stores files in `server/uploads`. This works locally, but Render's normal filesystem is not persistent across redeploys. For production, move uploads to Cloudinary, AWS S3, or another persistent storage service before relying on admin-uploaded images long term.
