const {Router} = require('express')
const yup = require('yup');
const bcrypt = require('bcrypt')
const knex = require("../../knex")
const router = Router();

const schema = yup.object().shape({
    username: yup.string().trim().min(2).required(),
    email: yup.string().trim().email().required(),
    password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
})

const errorMessages = {
    usernameInUser: 'Username in use.',
};
  

router.post('/', async(req, res, next) => {
    let { username, email, password } = req.body;
    var saltRounds = 10;
    
    //SELECT * FROM users WHERE username = ?
    const existingUsername = await knex.select('username').table('users').where({ username }).first();

    await schema.validate({ username, email, password })
    .catch(err => res.json(err))

    if(!username || !password || !password) return res.status(204)

    if (existingUsername) {
        const error = errorMessages.usernameInUser;
        return  res.status(403).json({
            message: error,
            status: 403
        }) 
    }

    bcrypt.genSalt(saltRounds, (err, salts) => {
        bcrypt.hash(password, salts, (err, hash) => {
            knex('users').insert({
                username: username,
                email: email,
                password: hash
            })
            .then((response) => {
                res.status(201).json(response);     
            })
            .catch((err) => {
                next(err)
            })
        })
    })
})

module.exports = router;