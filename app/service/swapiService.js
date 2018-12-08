const axios = require('axios');
const _ = require('lodash');

class SwapiService{
    constructor(config, planetRepository){
        this._host = config.SWAPI.HOST
        this._planetRepository = planetRepository
    }
    
    getMovieAppearances(planet){
            //Tatooine
            console.log(`[SERVICE] - Buscando aparições do planeta ${planet.name} em filmes`)

            return axios.get(`${this._host}/api/planets/?search=${planet.name}`)
                .then(response => _.get(response, 'data.results[0].films.length', 0))
                .catch(error => console.log(error))
        
    }
}

module.exports = () => SwapiService