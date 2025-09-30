# Estágio 1: Build (usa Node para construir a aplicação)
FROM node:18-alpine AS build
# Define o diretório de trabalho como o projeto React. 
# O código estará em /app/soundup dentro do container.
WORKDIR /app/soundup

# 1. Copia todos os arquivos do projeto React (package.json, src/, public/, etc.)
# O contexto é ./frontend, então copiamos a subpasta 'soundup' inteira para o WORKDIR (./)
# Isso garante que package.json e src/ estejam no mesmo nível.
COPY soundup/ .

# 2. Instala as dependências. A pasta node_modules será criada em /app/soundup/node_modules
RUN npm install

# 3. Constrói a aplicação React (gera o diretório 'build')
RUN npm run build

# Estágio 2: Production (usa Nginx para servir o build estático)
FROM nginx:stable-alpine AS production
# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copia a configuração do React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia o build da aplicação do estágio anterior para o diretório de serviço do Nginx
COPY --from=build /app/soundup/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
