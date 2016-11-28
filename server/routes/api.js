module.exports = function (app) {

    app.get('/api/', (req, res) => {
        res.render('api/index.pug')
    })

    app.post('/api/import', (req, res) => {
        console.log(req.body)
        res.json({ success: true, fileToImport: req.body.file })
    })

}
