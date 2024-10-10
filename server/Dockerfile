# Usando uma imagem base oficial do Node.js
FROM node:18

# Definindo o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiando os arquivos de dependências para o container
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código para o container
COPY . .

# Build do projeto NestJS
RUN npm run build

# Expondo a porta que sua aplicação utiliza (geralmente 3000 para NestJS)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
