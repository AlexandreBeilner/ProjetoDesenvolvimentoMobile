```bash
npm install
```

## Configure as variáveis de ambiente
Crie um arquivo .env na raiz:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=appdb
DB_USER=postgres
DB_PASS=postgres
NODE_ENV=development
```

```bash
docker compose up -d --build
```


```bash
npm run db:create

npm run db:migrate
```