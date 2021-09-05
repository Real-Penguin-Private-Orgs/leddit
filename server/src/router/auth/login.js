const {Router} = require('express')
const yup = require('yup');
const bcrypt = require('bcrypt')
const knex = require("../../knex")
const router = Router();

const schema = yup.object().shape({
    username: yup.string().trim().min(2).required(),
    password: yup
    .string()
    .min(2)
    .required(),
})

router.post('/', async(req, res, next) => {
    let {username, password} = req.body;
    await schema.validate({username, password}, {abortEarly: false})
    .catch((err) => {
        return res.json(err);
    })
    
    if(!username || !password) return res.status(204)

    knex('users').where({ username: username })
    .select('*')
    .then((result) => {
        var pass = result[0].password;
        bcrypt.compare(password, pass, (err, response) => {
            if(err) return next(err)
            if(response) {
                req.session.user = result;
                return res.send(result);
            } else {
                res.send({ message: "Wrong username/password combination!" });
            }
        })
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router;