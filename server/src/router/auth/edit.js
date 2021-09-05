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
    .min(4)
    .required()
})

router.put('/:id', async(req, res, next) => {
    let { id } = req.params;
    let { username, email, password } = req.body;
    await schema.validate({username, email, password})
    .catch((err) =>  res.json(err));

    knex('users')
    .where({ id: id })
    .update({ 
        username: username,
        email: email 
    })
    .then((result) => {
        var pass = result[0].password;
        bcrypt.compare(password, pass, (err, response) => {
            if(err) throw err;
            if(response) {
                res.json(result)
            } else {
                return;
            }
        })
    })
    .catch((err) => {
        next(err);
    })
})

module.exports = router;