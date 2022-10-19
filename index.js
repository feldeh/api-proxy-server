const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

// protecting routes
const whitelist = ['http://127.0.0.1']
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            // acknowledgment callback function when null is passed (see node error convention)
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccesstatus: 200,
}

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
