const User = require('../models/User.model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const SALT = 13;

router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.post('/signup', async (req, res, next) => {    
    try {
        const {username, password} = req.body
        if (!username || !password) {
            res.render('auth/signup.hbs', {
                errorMsg: 'Please, provide an e-mail/username C-C-COMBOOO'
            })
            return;
        }
        const foundUser = await User.findOne({username})
        if (foundUser) {
            res.render('auth/signup.hbs', {
                errorMsg: 'Username is already used'
            })
            return;
        }
        const securePassword = bcrypt.hashSync(password, SALT);
        await User.create({username, password: securePassword})    
        res.redirect('/auth/signin')
    }catch(error) {
        console.log(error)
    }
})

router.get('/signin', (req, res, next) => {
    res.render('auth/signin.hbs')
})

router.post('/signin', async (req, res, next) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            res.redirect('auth/signin', {
                errorMsg: 'Add a username / password C-C-COMBO!'
            })
            return;
        }
        const validUser =  await User.findOne({username: username})
        if (!validUser) {
            res.redirect('auth/signin', {
                errorMsg: 'Wrong credentials'
            })
            return;
        }
        const validPassword = bcrypt.compareSync(
            password,
            validUser.password
        )
        if (!validPassword) {
            res.redirect('auth/signin', {
                errorMsg: 'Wrong credentials'
            })
            return;
        } else {
            req.session.currentUser = {
                _id: validUser._id,
            }
            res.redirect('/private/main')
        }
    } catch(error) {
        console.log(error)
    }
})

module.exports = router