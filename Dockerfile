# ---- Build stage (installs deps, builds if needed) ----
    FROM node:20-bookworm AS builder
    WORKDIR /app
    
    # Faster, reproducible installs
    COPY package*.json ./
    RUN npm ci
    
    # App source
    COPY . .

    RUN npx prisma generate
    
    # If your app has a build step (e.g. TypeScript / bundling), this will run it.
    # If not, it will just no-op.
    RUN npm run build || echo "no build step"
    
    # Only keep production deps in the final image
    RUN npm prune --omit=dev
    
    # ---- Runtime stage (small, secure) ----
    FROM node:20-bookworm-slim AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    
    # Optional: tini for proper signal handling
    RUN apt-get update && apt-get install -y --no-install-recommends tini ca-certificates \
      && rm -rf /var/lib/apt/lists/*
    
    # Copy built app + prod deps
    COPY --from=builder /app /app
    
    # Run as non-root
    USER node
    
    # Adjust if your app listens on a different port
    EXPOSE 3000
    
    # Optional healthcheck (change path if needed)
    #HEALTHCHECK --interval=30s --timeout=3s --retries=5 CMD \
    #  wget -qO- http://localhost:3000/health || exit 1
    
    # If your start script is "node server.js", keep this:
    CMD ["tini","--","node","app.js"]
    
    # If your project uses Express generator ("npm start" runs ./bin/www), use instead:
    # CMD ["tini","--","npm","start"]