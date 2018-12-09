const config = {
    ENVIRONMENT: process.env.environment || 'dev',
    PORT: process.env.port || 3000,
    MONGO: {
        HOST: process.env.MONGO_HOST || 'localhost',
        PORT: process.env.MONGO_PORT || '27017',
        DATABASE: process.env.MONGO_DATABASE || 'planets',
        NUM_TENTATIVA_RECONEXAO: process.env.MONGO_NUM_TENTATIVA_RECONEXAO || 3,
        INTERVAL_RETENTATIVA: process.env.MONGO_INTERVAL_RETENTATIVA || 2000,
        TIMEOUT_SOCKET: process.env.MONGO_TIMEOUT_SOCKET || 30000,
        TIMEOUT_CONEXAO: process.env.MONGO_TIMEOUT_CONEXAO || 30000,
    },
    SWAPI:{
        HOST: 'https://swapi.co',
        TIMEOUT: 30000,
    }

}

if (config.ENVIRONMENT === 'test') {
    config.MONGO.DATABASE = 'planetsTest';
}

module.exports = config;