FROM node:24-bookworm-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY public ./public

ENV NODE_ENV=production
ENV PORT=5000
USER node
EXPOSE 5000
CMD ["node", "server.js"]
