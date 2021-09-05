const {Router} = require('express')
const knex = require('../../knex')
const router = Router();

const {auth} = require('../../utils/auth')

router.delete('/:id', auth, async(req, res, next) => {
        let { id } = req.params;
        await knex('users')
        .where({ id: id })
        .del()
        .then((result) => {
            res.status(100).json(result)
        })
        .catch((err) => {
            next(err);
        })
})

module.exports = router;