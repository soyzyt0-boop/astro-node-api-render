FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY ephe ./ephe

ENV HOST=0.0.0.0
ENV PORT=4318

EXPOSE 4318

CMD ["npm", "start"]
