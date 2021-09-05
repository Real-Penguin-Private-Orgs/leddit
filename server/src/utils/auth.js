// eslint-disable-next-line no-unused-vars
exports.auth = (req, res, next) => {
    if(!req.session.user) {
        return res.status(401).send({
            message: 'Unauthorized',
            loggedIn: false
        })
    } else {
        return res.status(200).send({
            user: req.session.user,
            loggedIn: true
        });
    }
}