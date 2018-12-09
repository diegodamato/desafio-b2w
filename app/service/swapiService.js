const axios = require('axios');
const config = require('./../../config/config');
const _ = require('lodash');

class SwapiService{
    constructor(config, planetRepository, error){
        this._host = config.SWAPI.HOST
        this._planetRepository = planetRepository
        this._error = error
        this._optionsRequest = {
            timeout: config.SWAPI.TIMEOUT,
            headers:{Accept:'application/json'}
        };
    }

    getMovieAppearances(planet, res){
        console.log(`[SERVICE] - Buscando aparições do planeta ${planet.name} em filmes`)
        return axios.get(`${this._host}/api/planets/?search=${planet.name}`, this._optionsRequest)
            .then(response => _.get(response, 'data.results[0].films.length', 0))
            .catch(error => this._error.catchError(error, res))
    }
}

module.exports = () => SwapiService