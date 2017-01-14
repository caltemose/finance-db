// const ui = require('./ui')
// const api = require('./api/api')
const errors = require('./errors')
//
// module.exports = function (app) {
//     ui(app)
//     api(app)
//     errors(app)
// }

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.render('index.pug')
    })

    app.use('/api', require('./api/api'))

    errors(app)
}
