# 🎶 SoundUp 
O SoundUp é uma plataforma de música desenvolvida para gerenciar músicas, artistas e preferências de usuários. Visualize suas músicas e artistas favoritos, tenha acesso a insights do mundo da música e confira estatísticas dos demais ouvintes da plataforma!
## Tecnologias Utilizadas
### Backend
![Springboot](https://img.shields.io/badge/Springboot-9c27b0?style=for-the-badge&logoColor=white)
### Frontend
![React](https://img.shields.io/badge/React-9c27b0?style=for-the-badge&logoColor=white)
### Banco de Dados
![MySQL](https://img.shields.io/badge/MySQL-9c27b0?style=for-the-badge&logoColor=white)

---

## Requisitos Prévios

Para iniciar o projeto, você precisa ter instalado:

* **Git**: Para clonar o repositório.
* **Docker Desktop**: Inclui o Docker Engine e o Docker Compose, necessários para construir e rodar os containers.

---

## Como Iniciar a Aplicação (Passo a Passo)

Siga estas instruções no seu terminal para colocar todos os serviços no ar:

### 1. Clonagem do Repositório

```bash
# 1. Clone o repositório
git clone <URL_DO_SEU_REPOSITORIO>

# 2. Acesse a pasta raiz (SoundUp)
cd SoundUp
```

### 2. Inicialização Completa

Execute o comando abaixo para construir as imagens (Frontend e Backend) e iniciar os três serviços (**mysql, backend, frontend**) em segundo plano (`-d`).

⚠️ **Atenção**: Certifique-se de que as portas **3000** (React), **8080** (Spring Boot) e **3306** (MySQL) não estejam sendo usadas por outras aplicações na sua máquina.

```bash
docker compose up --build -d
```

### 3. Verificação

Após a execução, aguarde cerca de 1 a 2 minutos para que o **Spring Boot** e o **MySQL** completem a inicialização e verifique o status:

```bash
docker compose ps
```

Todos os serviços devem estar no status `running` (ou `Up`).

---

## 🌐 Acessos da Aplicação

| Serviço               | Porta no Host | URL de Acesso                                  |
| --------------------- | ------------- | ---------------------------------------------- |
| Frontend (React)      | 3000          | [http://localhost:3000](http://localhost:3000) |
| Backend (Spring Boot) | 8080          | [http://localhost:8080](http://localhost:8080) |

---

## Debug e Comandos Úteis

### 1. Limpeza do Banco de Dados (Fundamental)

Se você fizer alterações no script de inicialização do banco (`init-db.sql`) ou enfrentar erros de integridade (`unhealthy`), você deve limpar o volume persistente do **MySQL** para forçar a recriação do esquema:

```bash
# Para, remove containers, redes E os volumes de dados
docker compose down -v 

# Inicia tudo novamente (o build não é estritamente necessário, mas garante a consistência)
docker compose up --build -d
```
---
## Equipe
Beatriz Victória Costa Pinto - bvcp@cesar.school  

Nina Henrique França Fernandes Bento de Sá - nhffbs@cesar.school  

Gabrielle Mastellari Velozo - gmv2@cesar.school   

Sofia Gomes Tenório - sgt@cesar.school 

GitHub: https://github.com/Sofia1653/SoundUp
