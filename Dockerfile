FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile
RUN npm install -g pm2

COPY prisma ./prisma
COPY . .

RUN npm run generate
RUN npm run build

CMD ["npm", "run", "prod"]
