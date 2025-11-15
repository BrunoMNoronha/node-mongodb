const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connect(uri) {
  const connectionString = uri || process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error('MONGODB_URI não encontrada. Defina-a em .env ou passe como parâmetro.');
  }

  // Opções recomendadas
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return mongoose.connect(connectionString, options);
}

module.exports = { connect, mongoose };
