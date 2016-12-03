// const cors = require('express-cors')
const ui = require('./ui')
const api = require('./api')
const errors = require('./errors')

module.exports = function (app) {
    // app.options('*', cors())
    // app.use(cors())
    // app.all('*', function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    //     if (req.method === "OPTIONS") {
    //         return res.status(200).end();
    //     }
    //     next();
    // });
    //
    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     next();
    // });

    ui(app)
    api(app)
    errors(app)
}
