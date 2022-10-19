const express = require('express')
const router = express.Router()
const url = require('url')
const needle = require('needle')
const apicache = require('apicache')

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            // add api key name and value
            [API_KEY_NAME]: API_KEY_VALUE,
            // add query params from the request
            ...url.parse(req.url, true).query,
        })

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        console.log(`${API_BASE_URL}?${params}`)
        const data = apiRes.body

        // log request made to our public api
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router
