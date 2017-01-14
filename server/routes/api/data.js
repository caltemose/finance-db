const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    const file = req.body.file
    console.log(file)
    res.jsonp({ file })
})

module.exports = router
