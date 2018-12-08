let mongoose = require('mongoose');

class PlanetRepository{
    constructor(){
        this._planetModel = mongoose.model('planet')
    }

    registerPlanet(planet, participations) {

        return new Promise((resolve, reject) => {
            let planetModel = new this._planetModel();
            
            planetModel.id = planet.id;
            planetModel.name = planet.name;
            planetModel.climate = planet.climate;
            planetModel.terrain = planet.terrain;
            planetModel.participations = participations;

            planetModel.save((erro) => {
                if (erro){
                    reject(erro);
                }else{
                    console.log('[REPOSITORY] Planeta salvo com sucesso no mongodb')
                    resolve();
                }
            })
         })
    }

    listAllPlanets() {
        return this._planetModel.find({});
    }

    findPlanetName(name){ 
        return new Promise((resolve, reject) =>{
            this._planetModel.find({name})
                .then(planets => resolve(planets.map(planet => Object.assign({}, planet._doc))))
                .catch(error => reject(error))
        })
    }
}

module.exports = () => PlanetRepository;