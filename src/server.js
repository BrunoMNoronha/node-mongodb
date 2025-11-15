require('dotenv').config();
const express = require('express');
const { connect } = require('./db');
const personsRoute = require('./routes/persons');

const app = express();
app.use(express.json());

app.use('/api/persons', personsRoute);

const PORT = process.env.PORT || 3000;

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
