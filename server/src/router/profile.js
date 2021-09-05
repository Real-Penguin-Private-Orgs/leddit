const {Router} = require('express');
const { auth } = require('../utils/auth');
const router = Router();

router.get('/', auth, async(req, res) => {
    res.json('Welcome')
})

module.exports = router;