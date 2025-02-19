
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            /*if(!req.body.nome.trim()){
                return res.status(400).send('Nome inválido!')
            }
           
            if(!req.body.cpf.trim()){
                return res.status(400).send('Nome inválido!')
            }*/
           
            app.db('usuarios')
                .insert({nome: req.body.nome,
                    cpf: req.body.cpf,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    password: password})
                .then( _ => res.json({"msg": "Usuário cadastrado com sucesso"}))
                .catch( err => res.json({"msg_erro": err}))
               
        })
    }

    const listUsuarios = (req, res) => {
        app.db('usuarios')
            .orderBy('nome')
            .then(users => res.json(users))
            .catch(err => res.json({"msg_erro": err}))
    }

    const getUsuario = (req, res) => {

        app.db('usuarios')
            .where({idusuario: req.body.idusuario})
            .then(user => {
                console.log(user.lenght)
                if(user.lenght > 0){
                    res.json(user[0])
                }else{
                    res.json(
                        {"msg_erro" : "Usuário NÃO encontrado."}
                    )
                }})
            .catch(err => res.json(
                {"msg_erro": err}
            ))
    }

    const remUsuario = (req, res) => {
        app.db('usuarios')
            .where({idusuario: req.body.idusuario})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0){
                    res.json(
                        {"msg" : "Remoção de Usuário realizada com SUCESSO!"}
                    )
                }else{
                    res.json(
                        {"msg_erro" : "Usuário NÃO encontrado."}
                    )
                }
            })
            .catch(err => res.json(
                {"msg_erro": err}
            ))
    }

    const updateUsuario = (req, res) => {

        obterHash(req.body.password, hash => {
            const password = hash

            app.db('usuarios')
            .where({idusuario: req.body.idusuario})
            .update({nome: req.body.nome, 
                cpf: req.body.cpf, 
                telefone: req.body.telefone, 
                email: req.body.email, 
                password: password})
            .then(affectedRows => {
                if(affectedRows > 0){
                    res.json(
                        {
                            "msg" : "Atualização de Usuário realizada com SUCESSO!"
                        }
                    )
                }else{
                    res.json(
                        {
                            "msg_erro" : "Usuário NÃO encontrado."
                        }
                    )
                }
            })
            .catch(err => res.json(
                {
                    "msg_erro": err
                }
            ))
                
        })
    }

    return {save, getUsuario, listUsuarios, remUsuario, updateUsuario}
}