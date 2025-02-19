module.exports = app => {
    app.post('/signup', app.api.usuarios.save)

    app.post('/signin', app.api.auth.signin)

    app.route('/usuarios/list')
    //.all(app.config.passport.authenticate())
    .post(app.api.usuarios.listUsuarios)

    app.route('/usuarios/update')
    //.all(app.config.passport.authenticate())
    .post(app.api.usuarios.updateUsuario)

    app.route('/usuarios/remove')
    //.all(app.config.passport.authenticate())
    .post(app.api.usuarios.remUsuario)

    app.route('/usuarios/get')
    //.all(app.config.passport.authenticate())
    .post(app.api.usuarios.getUsuario)

    app.route('/usuarios/list')
    //.all(app.config.passport.authenticate())
    .post(app.api.usuarios.listUsuarios)
}