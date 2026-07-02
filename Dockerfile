FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV HOST=0.0.0.0
ENV PORT=4318

EXPOSE 4318

CMD ["npm", "start"]
