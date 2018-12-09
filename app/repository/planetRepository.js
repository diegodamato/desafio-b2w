let mongoose = require('mongoose');

class PlanetRepository{
    constructor(){
        this._planetModel = mongoose.model('planet')
        this._excludedFields = { _id: false, __v: false }
    }

    registerPlanet(planet, participations) {

        return new Promise((resolve, reject) => {
            let planetModel = new this._planetModel();
            
            planetModel.id = planet.id;
            planetModel.name = planet.name;
            planetModel.climate = planet.climate;
            planetModel.terrain = planet.terrain;
            planetModel.participations = participations;

            planetModel.save(erro => erro ? reject(erro) : resolve())

         })
    }

    listAllPlanets() {
        return this._planetModel.find({}, this._excludedFields);
    }

    findPlanetName(name) { 
        return new Promise((resolve, reject) =>{
            this._planetModel.find({name}, this._excludedFields)
                .then(planets => resolve(planets.map(planet => Object.assign({}, planet._doc))))
        })
    }

    findIdPlanet(id) {
        return this._planetModel.findOne({id}, this._excludedFields);
    }

    removePlanet(id) {
        return this._planetModel.deleteOne({id});
    }
}

module.exports = () => PlanetRepository;