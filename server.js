const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

// protecting routes
const whitelist = ['http://127.0.0.1', 'http://localhost:3001']
const corsOptions = {
    origin: (origin, callback) => {
        console.log('origin: ' + origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            // acknowledgment callback function (see node error convention)
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccesstatus: 200,
}

app.use(morgan('tiny'))

app.use(cors(corsOptions))

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
})
app.use(limiter)

// enable trust proxy setting
app.set('trust proxy', 1)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', (req, res) => res.json({ success: 'This is a test' }))

app.use('/api', require('./routes'))
