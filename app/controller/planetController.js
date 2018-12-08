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
        
        console.log(`[CONTROLLER] - Iniciando registro do planeta ${planet.name}`)
        
        this._swapiService.getMovieAppearances(planet)
            .then(participations => this._planetRepository.registerPlanet(planet, participations))
            .then(() => res.status(201).json({'message': 'Planeta salvo com sucesso'}))
            .catch(error => console.log("Erro " + error));
    }

    listPlanets(req, res){
        console.log('[CONTROLLER] - Listagem de todos os planetas')

        this._planetRepository.listAllPlanets()
            .then(planets => planets.length ? res.status(200).json(planets) : res.status(204).json({}))
            .catch(error => console.log(error));
    }

    findName(req, res){
        const { name } = req.params;
        console.log(`[CONTROLLER] - Busca pelo planeta ${name}`)
        
        this._planetRepository.findPlanetName(name)
            .then(planets => planets.length ? res.status(200).json(planets) : res.status(204).json({}))
            .catch(error => console.log(error));
    }

    findId(req, res) {
        const { id } = req.params;
        console.log(`[CONTROLLER] - Busca planeta pelo id ${id}`)

        this._planetRepository.findIdPlanet(id)
            .then(planet => planet ? res.status(200).json(planet) : res.status(204).json({}))
    }

}

module.exports = () => PlanetController;