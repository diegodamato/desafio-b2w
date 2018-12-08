const uuidv1 = require('uuid/v1');

class PlanetController {
    constructor(planetRepository, swapiService){
        this._planetRepository = planetRepository
        this._swapiService = swapiService
    }

    register(req, res){
        // TO DO validar entradas da api
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

    findAll(req, res){
        this._planetRepository.findAllPlanets()
            .then(planets => res.status(200).json(planets))
            .catch(error => console.log(error));
    }
}

module.exports = () => PlanetController;