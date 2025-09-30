# Estágio 1: Build (usa Node para construir a aplicação)
FROM node:18-alpine AS build
# Define o diretório de trabalho como o projeto React
WORKDIR /app/soundup
# O build context é ./frontend, então copiamos a pasta soundup inteira
COPY soundup/package*.json ./
# Instala as dependências
RUN npm install
# Copia o restante do código-fonte
COPY soundup/ .
# Constrói a aplicação React (gera o diretório 'build' dentro de /app/soundup)
RUN npm run build

# Estágio 2: Production (usa Nginx para servir o build estático)
FROM nginx:stable-alpine AS production
# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Configuração simples para o React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia o build da aplicação do estágio anterior para o diretório de serviço do Nginx
COPY --from=build /app/soundup/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# --- Adicione o arquivo nginx.conf simples na pasta frontend/ ---
# Observação: Você deve criar um arquivo frontend/nginx.conf com o seguinte conteúdo
# para garantir que o React Router funcione corretamente.

# server {
#     listen 80;
#     root /usr/share/nginx/html;
#     index index.html;
#     
#     location / {
#         try_files $uri $uri/ /index.html;
#     }
# }
