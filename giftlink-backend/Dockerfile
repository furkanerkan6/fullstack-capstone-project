FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN cd util/import-mongo && npm ci --omit=dev
ENV NODE_ENV=production
EXPOSE 3060
CMD ["node", "app.js"]
