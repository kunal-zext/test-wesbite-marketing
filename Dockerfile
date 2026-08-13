# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 — builder: install ALL deps (incl. dev) and run `next build`.
# `output: "standalone"` in next.config.ts makes the build emit a
# self-contained bundle at .next/standalone (server.js + only the
# node_modules that are actually traced as needed).
# Backend service URLs are baked in from src/utils/constants/apiEndpoints.ts
# (selected by NODE_ENV, which `next build` sets to "production"), so no
# build args are needed.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---------------------------------------------------------------------------
# Stage 2 — runner: ship only the standalone output.
# No package.json / npm install needed — the standalone bundle includes the
# minimal node_modules and a server.js entrypoint. `public` and
# `.next/static` are NOT copied into the bundle automatically, so we add them.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Standalone server + traced node_modules (next.config is serialized into it).
COPY --from=builder /app/.next/standalone ./
# Static assets that the standalone server expects to serve.
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Run as the unprivileged user that ships with the node image.
USER node

EXPOSE 3000

CMD ["node", "server.js"]
