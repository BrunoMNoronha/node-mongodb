const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

function getOptions() {
  return {
    // Ajuste pool para ambiente serverless: manter pequeno para evitar excesso de conexões
    maxPoolSize: process.env.MONGO_MAX_POOL_SIZE ? Number(process.env.MONGO_MAX_POOL_SIZE) : 10,
    // timeouts razoáveis
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    // outras opções podem ser adicionadas se necessário
  };
}

async function connect() {
  if (!uri) throw new Error('MONGODB_URI não definido');

  // Reuse connection across lambda invocations
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!global.__mongoosePromise) {
    global.__mongoosePromise = mongoose.connect(uri, getOptions()).then(() => mongoose);
  }

  return global.__mongoosePromise;
}

module.exports = { connect, mongoose };
