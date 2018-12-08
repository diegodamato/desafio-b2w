const config = require('./../../config/config')

module.exports = app =>{
    return {
        get planet(){
            return app.model.planetModel;
        },

        get planetRepository(){
            return new app.repository.planetRepository(this.planet);
        },

        get swapiService(){
            return new app.service.swapiService(config, this.planetRepository);
        },

        get planetController(){
            return new app.controller.planetController(this.planetRepository, this.swapiService);
        }
    }
}