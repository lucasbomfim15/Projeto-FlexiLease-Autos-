# Projeto Desafio FlexiLease API

## Descrição do Projeto

FlexiLease é uma API Rest. O projeto utiliza Node.js com TypeScript e o Mongoose para gerenciamento do banco de dados MongoDB. A API permite cadastrar usuarios, carros e fazer reservas, com foco em um código bem organizado e documentado utilizando Swagger.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **MONGOOSE**
- **MONGODB**
- **Swagger** para documentação

## Requisitos

- Node.js (versão 20.11.1)
- NPM (versão 6 ou superior)

## Configuração do Ambiente

### Arquivo `.env`

Apague a parte `.example` do arquivo `.env.exemplo` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```
PORT=3000

MONGO_DB_URL = insira a sua url do banco de dados

JWT_SECRET= insira uma chave secreta


JWT_EXPIRES_IN= insira o tempo de expiração do token
```

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/lucasbomfim15/Projeto-FlexiLease-Autos-.git

   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Coloque sua URL do banco de dados mongodb:

  

   Coloque sua URL do banco no .env na MONGO_DB_URL.

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000`.

Para usar com o swagger tente por `http://localhost:3000/api-docs/`


