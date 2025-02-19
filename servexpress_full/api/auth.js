const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password){
            return res.json({"msg_erro":'Dados incompletos'})
        }

        // Await permite que a próxima instrução só seja
        // executada depois do término da atual
        const user = await app.db('usuarios')
            .where({email: req.body.email})
            .first()
        if(user){
            bcrypt.compare(req.body.password, user.password,
                (err, isMatch) => {
                    if(err || !isMatch){
                        return res.json({"msg_erro": 'Login ou senha incorretos!'})
                    }

                    const payload = {id: user.idusuario}
                    res.json({
                        nome: user.nome,
                        email: user.email,
                        token: jwt.encode(payload, authSecret)
                    })
                })
        }else{
            res.json({"msg_erro":'Login ou senha incorretos!'})
        }
    }

    return {signin}

}