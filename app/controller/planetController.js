const uuidv1 = require('uuid/v1');

class PlanetController {
    constructor(planetRepository, swapiService){
        this._planetRepository = planetRepository
        this._swapiService = swapiService
    }

    register(req, res){
        const planet =  req.body;
        planet.id = uuidv1();
        
        this._swapiService
            .getMovieAppearances(planet)
                .then(participations => this._planetRepository.registerPlanet(planet, participations))
                .then(() => {
                    console.log('[CONTROLLER] - Planeta salvo com sucesso')
                    res.status(201).json({'message': 'Planeta salvo com sucesso'});
                })
                .catch(error => console.log("Erro " + error));
    }

    
}

module.exports = () => PlanetController;