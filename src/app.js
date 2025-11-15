require('dotenv').config();
const { connect, mongoose } = require('./db');

(async () => {
  try {
    console.log('Tentando conectar ao MongoDB...');
    await connect();
    console.log('Conexão com MongoDB estabelecida com sucesso.');

    // Apenas para teste: listar databases (somente se usuário tiver permissão)
    try {
      const admin = mongoose.connection.db.admin();
      const info = await admin.serverStatus();
      console.log('Server status OK. version:', info.version);
    } catch (e) {
      // Se não tiver permissão, só ignoramos
      console.log('Conectado, mas não foi possível recuperar serverStatus (pode ser permissões).');
    }

    await mongoose.disconnect();
    console.log('Desconectado.');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message || err);
    process.exit(1);
  }
})();
