function authRequired (req, res, next) {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/auth/signin')
    }
}

module.exports = authRequired
