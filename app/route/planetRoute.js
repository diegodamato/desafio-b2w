module.exports = app =>{

    let controller = app.beans.factory.planetController;

    app.route("/v1/planet")
        .post(controller.register.bind(controller))
        .get(controller.listPlanets.bind(controller))

    app.route("/v1/planet/name/:name")
        .get(controller.findName.bind(controller));

}