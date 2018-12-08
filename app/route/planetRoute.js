module.exports = app =>{

    let controller = app.beans.factory.planetController;

    app.route("/v1/planet")
        .post(controller.register.bind(controller));
    
    // app.route("/v1/planet/:id")
    //     .get(controller.findId.bind(controller));

}