const app = require('./app')();
const config = require('./config/config');

app.listen(config.PORT, function () {
    console.log(`Server running on port ${config.PORT}`);
});
