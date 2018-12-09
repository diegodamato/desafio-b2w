class Error {
    constructor() {
    }

    catchError(error, res) {
        if (error.status) {
            console.error(`errorStatus: ${error.status} - errorMessage: ${error.message}`);
            res.status(error.status)
                .send({'message': error.message});
            return;
        }
        console.log(`Ocorreu um erro: ${error}`)
        res.status(500)
            .send({'message': 'Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde'});
    }
};

module.exports = () => Error