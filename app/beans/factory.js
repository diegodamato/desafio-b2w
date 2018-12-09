const config = require('./../../config/config')

module.exports = app =>{
    return {
        get error(){
            return new app.util.error();
        },

        get planetRepository(){
            return new app.repository.planetRepository();
        },

        get swapiService(){
            return new app.service.swapiService(config, this.planetRepository, this.error);
        },

        get planetController(){
            return new app.controller.planetController(this.planetRepository, this.swapiService, this.error);
        }
    }
}