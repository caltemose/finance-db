const cors = require('express-cors')
const ui = require('./ui')
const api = require('./api')
const errors = require('./errors')

module.exports = function (app) {
    app.use(cors())

    ui(app)
    api(app)
    errors(app)
}
