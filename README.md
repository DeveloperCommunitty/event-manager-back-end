# Gerenciamento de Eventos API 🚀

## Descrição

API desenvolvida para organização e gestão de eventos, permitindo o cadastro de usuários, criação de eventos, envio de convites e participação em eventos.

## Tecnologias Utilizadas

- **NestJS** - Framework backend
- **Prisma ORM** - Gerenciamento do banco de dados PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT (JSON Web Token)** - Autenticação e segurança
- **Swagger** - Documentação interativa da API

## Instalação 💻

1. Clone o repositório:

   ```sh
   git clone https://github.com/DeveloperCommunitty/event-manager-back-end.git

   cd event-manager-back-end
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o banco de dados:
   - Crie um arquivo `.env` na raiz do projeto e defina a variável `DATABASE_URL`:
     ```sh
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/event_manager
     JWT_SECRET=sua_chave_secreta
     ```
   - Execute as migrações do Prisma:
     ```sh
     npx prisma migrate dev
     ```

## Execução 🧪

### Ambiente de Desenvolvimento

```sh
npm run start:dev
```

### Ambiente de Produção

```sh
npm run build
npm run start
```

## Documentação da API

A documentação está disponível via Swagger e pode ser acessada após iniciar a aplicação:

```
http://localhost:3000/docs
```

## Endpoints Principais 🧩

### Autenticação

- `POST /auth/login` - Login e obtenção do token JWT
- `POST /cadastro` - Cadastro de usuário

### Usuários

- `GET /usuario` - Listar usuários
- `GET /usuario/:id` - Buscar usuário por ID
- `PATCH /usuario/:id` - Atualizar usuário
- `DELETE /usuario/:id` - Remover usuário

### Eventos

- `POST /evento` - Criar um evento
- `GET /evento` - Listar eventos
- `PATCH /evento/:id` - Atualizar evento
- `DELETE /evento/:id` - Remover evento

### Convites

- `POST /convite` - Enviar convite
- `GET /convite/enviado/:senderId` - Buscar convite por ID do usuario
- `PATCH /convite/aceitar/:token` - Aceitar convite
- `PATCH /convite/recusar/:token` - Recusar convite

## Contribuição

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature-minha-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona minha feature'`)
4. Envie para o repositório remoto (`git push origin feature-minha-feature`)
5. Abra um Pull Request

## Licença 📃

Este projeto está sob a licença MIT. Veja o arquivo [licença MIT](./LICENCE) para mais detalhes.
