const bodyParser = require('body-parser')
const cors = require('cors')
//cors serve para permitir o acesso de sua aplicação a partir de aplicações diferentes

module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.text())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use(cors({
        origin: '*'
    }))
}