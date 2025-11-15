# node-mongodb

Aplicação exemplo: páginas HTML estáticas em `public/` consumindo uma API serverless (Vercel) que usa Mongoose/MongoDB para CRUD de `Person`.

## O que este repositório contém
- `public/index.html` — interface simples com formulário para criar e editar pessoas e listagem.
- `api/persons.js` — função serverless (GET, POST).
- `api/persons/[id].js` — função serverless (GET, PUT, DELETE).
- `src/lib/mongo.js` — helper de conexão Mongoose, com cache global para uso em ambiente serverless.
- `src/models/person.js` — modelo Mongoose para Pessoa.

## Pré-requisitos
- Node.js (recomendado 20.x se manter `mongodb@7` presente no `package.json`).
- Conta no Vercel (ou CLI `vercel` para deploy manual).
- Banco MongoDB (Atlas ou outro) com uma connection string.

## Variáveis de ambiente (definir no Vercel)
- `MONGODB_URI` — string de conexão para seu cluster MongoDB (ex.: `mongodb+srv://user:pass@cluster0.mongodb.net/dbname?retryWrites=true&w=majority`).

Opcionalmente, localmente você pode criar um arquivo `.env` com:

```
MONGODB_URI=mongodb+srv://node_db_user:node_db_pass@cluster0.q5ix6pd.mongodb.net/?appName=Cluster0
```

> Não comite credenciais sensíveis no repositório.

## Como rodar localmente
1. Instale dependências:

```powershell
npm install
```

2. Inicie o servidor de desenvolvimento do Vercel (recomendado para testar functions serverless localmente):

```powershell
npx vercel dev
```

Abra `http://localhost:3000` e teste a interface/formulários.

Alternativa (apenas para testar código localmente sem serverless):
```powershell
npm run dev
```
> Observe: `npm run dev` inicia o `src/server.js` (servidor Express) — útil para desenvolvimento local tradicional. Para deploy no Vercel preferimos as functions em `api/`.

## Deploy no Vercel
1. Crie um projeto no Vercel e conecte ao repositório (GitHub/GitLab/Bitbucket) ou use `vercel` CLI.
2. No painel do projeto (Project Settings -> Environment Variables), adicione **MONGODB_URI** para os ambientes (Preview/Production) com o valor da sua connection string.
3. (Opcional) Se quiser usar Node 20 devido a `mongodb@7`, configure `engines.node` no `package.json` ou escolha Node 20 nas configurações do projeto.
4. Faça um push no branch configurado (ex.: `main`) e o Vercel vai construir e deployar automaticamente.

Com a configuração padrão deste repositório, as páginas estáticas em `public/` serão servidas automaticamente e as funções em `api/` serão deployed como serverless endpoints.

## Observações e boas práticas
- Em ambientes serverless evite abrir uma nova conexão ao Mongo em cada invocação. Este repositório já utiliza cache global em `src/lib/mongo.js` para reusar a conexão entre invocações (cold starts ainda abrem nova conexão, mas invocações subsequentes reutilizam).
- Ajuste `maxPoolSize` em `src/lib/mongo.js` conforme seu plano/limite do MongoDB Atlas.
- Se preferir não exigir Node 20, remova a dependência direta `mongodb` do `package.json` (Mongoose inclui o driver internamente). Caso mantenha `mongodb@7`, configure Node 20 no Vercel.

## Testes e debugging
- Use `npx vercel dev` para debugar e testar as functions localmente.
- Ver logs na dashboard do Vercel para investigar erros de runtime nas functions.

## Próximos passos sugeridos
- Adicionar autenticação (JWT/session) para proteger endpoints.
- Validar e sanitizar entradas do formulário no servidor.
- Paginação e filtros para listagens grandes.

---

Se quiser, eu posso:
- Remover `mongodb` do `package.json` e ajustar `engines` automaticamente;
- Adicionar interface de edição mais rica (modal), ou testes automatizados com supertest/jest.
