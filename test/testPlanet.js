const app = require('./../app')();
const mongoose = require('mongoose');
const request = require('supertest');
const config = require('./../config/config');
const DatabaseCleaner = require('database-cleaner');

const planetTerra = {
    id:'1d887c00-fb66-11e8-860c-27b8020ec3d4',
    name:'Terra',
    climate:'Árido',
    terrain:'plano',
    participations:0,
}

const planetTatooine = {
    id:'1d887c00-fb66-11e8-860c-27b8020ec3d3',
    name:'Tatooine',
    climate:'Árido',
    terrain:'plano',
    participations:5,
}

const planetWithoutName = {
    id:'1d887c00-fb66-11e8-860c-27b8020ec3d4',
    name:'',
    climate:'Árido',
    terrain:'plano',
    participations:0,
}

describe('Testando api de planetas', () => {
    const uri = `mongodb://${config.MONGO.HOST}:${config.MONGO.PORT}/${config.MONGO.DATABASE}`

    before(done => {
        if (config.ENVIRONMENT != 'test'){
            throw new Error ('Os testes automatizados devem ser executados em ambiente de test. Defina a variável de ambiente NODE_ENV=test')
        }
        done();
    });

    beforeEach(done => {
        mongoose.connect(uri, { useNewUrlParser: true }, (erro,db) => {
            let databaseCleaner = new DatabaseCleaner('mongodb');
            databaseCleaner.clean(mongoose.connection.db,() => {
                db.createCollection('planets',null,(planetError, planetsTest) => {
                    planetsTest.insertOne(planetTatooine, () => done());
                });
            });
        });
    }); 

    it('#Criando um novo planeta (201)', done => {
        request(app)
            .post(`/v1/planet`)
            .send(planetTerra)
            .timeout(30000)
            .expect(201, {'message': `Planeta ${planetTerra.name} salvo com sucesso`})
            .expect('Content-Type',/json/)
            .end(done)
    });

    it('#Criando um novo planeta sem nome (400)', done => {
        request(app)
            .post(`/v1/planet`)
            .send(planetWithoutName)
            .timeout(30000)
            .expect(400, {'message': 'Nome não pode ser vazio'})
            .expect('Content-Type',/json/)
            .end(done)
    });

    it('#Consultando planeta pelo id com retorno (200)', done => {
        const response = {
            id:'1d887c00-fb66-11e8-860c-27b8020ec3d3',
            name:'Tatooine',
            climate:'Árido',
            terrain:'plano',
            participations:5,
        }

        request(app)
            .get(`/v1/planet/${planetTatooine.id}`)
            .timeout(30000)
            .expect(200, response)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('#Consultando planeta pelo id sem retorno (404)', done => {
        request(app)
            .get(`/v1/planet/1d887c00`)
            .timeout(30000)
            .expect(404)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('#Consultando planeta pelo nome com retorno (200)', done => {
        request(app)
            .get(`/v1/planet/name/${planetTatooine.name}`)
            .timeout(30000)
            .expect(200)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('#Consultando planeta pelo nome sem retorno (404)', done => {
        request(app)
            .get(`/v1/planet/name/Terra`)
            .timeout(30000)
            .expect(404)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('#Consultando listagem de planetas (200)', done => {
        const response = [{
            id:'1d887c00-fb66-11e8-860c-27b8020ec3d3',
            name:'Tatooine',
            climate:'Árido',
            terrain:'plano',
            participations:5,
        }];

        request(app)
            .get(`/v1/planet`)
            .timeout(30000)
            .expect(200, response)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('#Removendo um planeta com sucesso(200)', done => {
        request(app)
            .delete(`/v1/planet/${planetTatooine.id}`)
            .timeout(30000)
            .expect(200, {'message': `Planeta com id ${planetTatooine.id} removido com sucesso`})
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('#Removendo um planeta sem sucesso(200)', done => {
        request(app)
            .delete('/v1/planet/1d887c00')
            .timeout(30000)
            .expect(404)
            .expect('Content-Type',/json/)
            .end(done);
    });
});
    