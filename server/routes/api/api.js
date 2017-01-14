const express = require('express')
const router = express.Router()

router.use('/transactions', require('./transactions'))
router.use('/categories', require('./categories'))
router.use('/budgets', require('./budgets'))
router.use('/data', require('./data'))

module.exports = router
