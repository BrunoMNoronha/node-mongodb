require('dotenv').config();
const express = require('express');
const path = require('path');
const { connect } = require('./db');
const personsRoute = require('./routes/persons');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/persons', personsRoute);

app.get(
  /^\/(?!api\/).*/,
  /**
   * Retorna o arquivo index.html para qualquer rota não-API suportando SPA simples.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   */
  (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
);

const PORT = process.env.PORT || 3000;

/**
 * Inicializa a aplicação conectando ao banco e iniciando o servidor HTTP.
 * @returns {Promise<void>} Promise resolvida quando o servidor estiver ouvindo conexões.
 */
async function start() {
  try {
    await connect();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Erro ao iniciar aplicação:', err);
    process.exit(1);
  }
}

start();
