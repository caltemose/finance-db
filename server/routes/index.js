// const cors = require('express-cors')
const ui = require('./ui')
const api = require('./api')
const errors = require('./errors')

module.exports = function (app) {
    // app.options('*', cors())
    // app.use(cors())
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }
        next();
    });

    ui(app)
    api(app)
    errors(app)
}
