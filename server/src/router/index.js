const {Router} = require('express')
const router = Router();

const authRoutes = require('./auth/index')
const userRoutes = require('./users')
const profileRoutes = require('./profile')
const postsRoutes = require('./posts')

router.get('/', (req, res) => {
    res.json({
        message: 'HI API 🚓🚗🚗'
    })
})

router.use('/posts', postsRoutes)
router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)
router.use('/user', userRoutes)

module.exports = router;