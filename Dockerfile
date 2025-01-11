# syntax=docker/dockerfile:1

# Use a imagem base do Node.js
FROM node:23.5.0-slim AS base

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Rode o build
RUN npm run build

# Exponha a porta 3000 para o frontend
EXPOSE 3005

# Inicie o Vite na porta 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3005"]
