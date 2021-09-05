const express = require('express')
const app = express();
const knex = require('./knex')
const morgan = require('morgan')
const cors = require('cors');
const session = require('express-session')
const {NotFound, errorHandler} = require('./middlewares')

let corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}

const apiRoutes = require('./router/index')

app.use(cors(corsOptions))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.TOKEN || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.get('/', async(req, res) => {
    res.json({
        message: 'HI API'
    })
})

app.use('/api/v1/', apiRoutes)

app.use(NotFound)
app.use(errorHandler)

module.exports = app;