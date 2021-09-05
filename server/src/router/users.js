const {Router} = require('express');
const router = Router();
const knex = require('../knex')

router.get('/:id', async(req, res) => {
        let { id } = req.params;
        knex('users')
        .where({ id: id })
        .then(data => {
            var userData = {
                id: data[0].id,
                username: data[0].username,
                email: data[0].email,
                created_at: data[0].created_at
            }
            res.json(userData)
        })
})

module.exports = router;