FROM node:latest

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

ENV PORT=3000

EXPOSE ${PORT}

CMD ["node", "dist/index.js"]