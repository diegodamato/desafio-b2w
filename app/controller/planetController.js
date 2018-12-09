const uuidv1 = require('uuid/v1');
class PlanetController {
    constructor(planetRepository, swapiService, error){
        this._planetRepository = planetRepository
        this._swapiService = swapiService
        this._error = error
    }

    register(req, res){
        try{
            if (!req.body.name){
                res.status(400).send(this._generatorMessage('Nome não pode ser vazio'))
                return;
            }
            
            const planet = req.body;
            planet.id = uuidv1();
            
            console.log(`[CONTROLLER] - Iniciando registro do planeta ${planet.name}`)
            
            this._swapiService.getMovieAppearances(planet)
                .then(participations => this._planetRepository.registerPlanet(planet, participations))
                .then(() => res.status(201).json(this._generatorMessage(`Planeta ${planet.name} salvo com sucesso`)))

        }catch(error){
            this._error.catchError(error, res);
        }
    }

    listPlanets(req, res){
        try{
            console.log('[CONTROLLER] - Listagem de todos os planetas')
            this._planetRepository.listAllPlanets()
                .then(planets => planets.length ? res.status(200).json(planets) : res.status(404).json({}))

        }catch(error){
            this._error.catchError(error, res)
        }
    }

    findName(req, res){
        try {
            const { name } = req.params;
            console.log(`[CONTROLLER] - Busca pelo planeta ${name}`)
            this._planetRepository.findPlanetName(name)
                .then(planets => planets.length ? res.status(200).json(planets) : res.status(404).json({}))
        
        }catch(error){
            this._error.catchError(error, res);
        }
    }

    findId(req, res) {
        try{
            const { id } = req.params;
            console.log(`[CONTROLLER] - Busca planeta pelo id ${id}`)
    
            this._planetRepository.findIdPlanet(id)
                .then(planet => planet ? res.status(200).json(planet) : res.status(404).json({}))
        
        }catch(error){
            this._error.catchError(error, res);
        }
        
    }

    remove(req, res) {
        try{
            const { id } = req.params;
            const message = this._generatorMessage(`Planeta com id ${id} removido com sucesso`);
            console.log(`[CONTROLLER] - Remove planeta de id ${id}`)
            
            this._planetRepository.removePlanet(id)
                .then(result => { result.n ? res.status(200).json(message) : res.status(404).json({})})
        }catch(error){
            this._error.catchError(error, res);
        }
    }

    _generatorMessage(message) {
        return {message}
    }
}

module.exports = () => PlanetController;