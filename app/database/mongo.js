const mongoose = require('mongoose');
const config = require('./../../config/config');

const uri = `mongodb://${config.MONGO.HOST}:${config.MONGO.PORT}/${config.MONGO.DATABASE}`;

const options = {
  socketTimeoutMS: config.MONGO.TIMEOUT_SOCKET,
  connectTimeoutMS: config.MONGO.TIMEOUT_CONEXAO,
  reconnectTries: config.MONGO.NUM_TENTATIVA_RECONEXAO,
  reconnectInterval: config.MONGO.INTERVAL_RETENTATIVA,
  keepAlive: true,
  autoReconnect: true,
  useNewUrlParser: true,
};

const connectMongodb = () => {
  mongoose.connect(uri, options)
    .then(() => console.debug('[ MONGODB] Connected to mongo'))
    .catch(err => console.log('[ MONGODB] Error connecting to mongo', err));
};

connectMongodb();
