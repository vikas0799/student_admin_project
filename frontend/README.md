# Student Admin – React frontend

A React (Vite) client for the Express + EJS backend in `../backend`.
The backend is used as it is; nothing in it was changed.

## Run

1. Start MongoDB (the backend connects to `mongodb://127.0.0.1:27017/collegeDB`).
2. Start the backend (port 3000):

   ```bash
   cd backend && node app.js
   ```

3. Start the frontend (port 5173):

   ```bash
   cd frontend && npm run dev
   ```

4. Open http://localhost:5173

## How it talks to the backend

The backend renders HTML pages and has no JSON API or CORS. So:

- `vite.config.js` proxies `/api/*` to `http://localhost:3000/*` (no CORS needed).
- `src/api/studentApi.js` reads the `/getdata` HTML page and pulls the student
  data out of it with `DOMParser`.
- Create / update / delete send the same requests as the EJS forms. The backend
  replies with a redirect to `/getdata`, which counts as success.

| React page           | Backend route used                      |
| -------------------- | --------------------------------------- |
| `/students`          | `GET /getdata`                          |
| `/students/new`      | `POST /createdata`                      |
| `/students/:id/edit` | `GET /getdata` + `POST /update/:id`     |
| Delete button        | `GET /delete/:id`                       |

**Note:** because the data comes from HTML, changing the markup of
`backend/views/students.ejs` (the `.card`, `<strong>Label:</strong>` and
`a.edit` parts) will break the parser in `studentApi.js`.

## Production

`npm run build` creates `dist/`. The proxy only works in dev, so in production
serve `dist/` and the backend from the same domain (for example nginx sending
`/api/*` to the backend) so the `/api` calls still reach it.
