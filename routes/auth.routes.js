const router = require('express').Router();
const bcrypt = require("bcrypt")
const User = require('../models/User.model')

router.get('/signup', (req, res) => {
    res.render("auth/signup")
});


router.post("/signup", async (req, res) => {
    const {email, password} = req.body

    if (!password || !email) {
        const errorMessage = `Your password or email are not valid`
        res.render("auth/signup", {errorMessage})
        return
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    if (!regex.test(password)){
        return res.render('auth/signup', {
            errorMessage: `Password needs to have 8 char, including lower/upper case and a digit`
        })
    }


    try {
        const foundUser = await User.findOne({email})

        if (foundUser) {
            const errorMessage = `You are already registered!`
            res.render('auth/signup', {errorMessage})
            return
        }
    
        const hashedPassword = bcrypt.hashSync(password, 12) //where salt is set to 12
        const createdUser = await User.create({
            email,
            password: hashedPassword,
        })
        res.redirect('/profile')
    } catch (err){
        console.log(err)
    }
})

router.get('/login', (req, res, next) => {
    res.render('auth/login');
  })
  


module.exports = router