const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', (req, res) => res.json({ success: 'This is a test' }))

app.use('/api', require('./routes'))
