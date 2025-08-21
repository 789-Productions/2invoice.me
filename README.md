# 2invoice.me

## Quick Start: Run Dev Stack with Docker Compose (Next.js + Prisma + MySQL)

### 0) Prereqs

* Docker Desktop (or Docker Engine) + Docker Compose
* Project has Prisma (`prisma/schema.prisma`) with `provider = "mysql"`

---

### Create `Dockerfile` (dev)

```dockerfile
# Dockerfile — dev
FROM node:24-alpine
WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
```

---

### Create `docker-compose.yml`

```yaml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root@mysql:3306/2invoiceme_local
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - mysql

  mysql:
    image: mysql:8.4
    environment:
      - MYSQL_DATABASE=2invoiceme_local
      - MYSQL_ALLOW_EMPTY_PASSWORD=yes   # dev-only
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data: {}
```

> Inside containers, the DB host is `mysql` (service name), **not** `localhost`.

---

### Ensure Prisma datasource

`prisma/schema.prisma`

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL") // mysql://root@mysql:3306/2invoiceme_local
}

generator client {
  provider = "prisma-client-js"
}
```

(Optional) `.env` for local tools:

```
DATABASE_URL="mysql://root@localhost:3306/2invoiceme_local"
```

---

### Start everything

```bash
docker compose up -d --build
```

---

### Generate Prisma client & run migrations (manual)

```bash
docker compose exec web npx prisma generate
docker compose exec web npx prisma migrate dev --name init
```

---

### Open the app

* Next.js dev server: [http://localhost:3000](http://localhost:3000)

(Optional) Prisma Studio:

```bash
# expose 5555 if you want; add "5555:5555" to web.ports first.
docker compose exec web npx prisma studio --port 5555
# then: http://localhost:5555
```

---

### DB access (handy commands)

* From host (CLI): `mysql -h 127.0.0.1 -P 3306 -u root`
* From container: `docker compose exec mysql mysql -uroot`
* GUI (TablePlus / Workbench): host `127.0.0.1`, user `root`, no password, db `2invoiceme_local`

---

### Common tasks

* **View logs:** `docker compose logs -f web` / `docker compose logs -f mysql`
* **Restart services:** `docker compose restart`
* **Rebuild after deps change:** `docker compose up -d --build`
* **Reset DB (⚠️ wipes data):**

  ```bash
  docker compose down -v
  docker compose up -d --build
  docker compose exec web npx prisma migrate dev
  ```

---

### Notes

* Data **persists locally** via the `mysql_data` volume (survives reboots).
* If migrations fail at first run, wait \~10s for MySQL to finish initializing, then rerun.
* Dev-only settings (root/no password) — don’t use in prod.
