const {Router} = require('express')
const router = Router();
const {auth} = require('../../utils/auth')

const loginRoutes = require('./login')
const registerRoutes = require('./register')
const deleteRoutes = require('./delete')

// eslint-disable-next-line no-unused-vars
router.get('/', auth, (req, res) => {})

router.use('/login', loginRoutes)
router.use('/delete', deleteRoutes)
router.use('/register', registerRoutes)

module.exports = router;