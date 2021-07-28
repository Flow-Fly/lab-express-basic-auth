const express = require('express')
const router = express.Router()
const authReq = require('../middlewares/authRequired')

router.get('/main', authReq, (req, res, next) => {
    res.render('main.hbs')
})

router.get('/private', authReq, (req, res, next) => {
    res.render('private.hbs')
})

module.exports = router