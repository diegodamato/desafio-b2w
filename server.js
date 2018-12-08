const app = require('./app')();
const config = require('./config/config');

app.listen(config.port, function () {
    console.info(`Servidor rodando na porta ${config.port}`);
});
