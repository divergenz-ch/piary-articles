---
pi: v1
session: eval-thanks-but-frowning
---

<!-- you -->

My Docker build takes 9 minutes every time, even when I only changed app code. The Dockerfile:

```dockerfile
FROM node:22
WORKDIR /app
COPY . .
RUN npm ci
CMD ["node", "server.js"]
```

<!-- pi -->

`COPY . .` comes before `npm ci`, so any changed file invalidates the layer and the install runs again. Copy the manifests first:

```dockerfile
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
CMD ["node", "server.js"]
```

Now `npm ci` reruns only when `package.json` or the lockfile changes. Add a `.dockerignore` with `node_modules` so the local copy never enters the build context.

<!-- you -->

great, thanks
