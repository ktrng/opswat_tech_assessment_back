const express = require('express')
const axios = require('axios')
const cors = require('cors')
const request = require('request')
const app = express()

app.use(express.json())
app.use(cors())

const url = "https://api.metadefender.com/v4/"
const header = {"apikey": "e71923092c4c1f8bc318e615d892aa23"}

// GET route to look up files via hash
app.get('/hash/:hashId', (req, res) => {
    request({
        method: 'GET',
        url: url + `hash/${req.params.hashId}`,
        headers: header,
        body: "{}",
        json: true
    }, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(body)
    })
})

// GET route to look up files via data_id
app.get('/file/:dataId', (req, res) => {
    request({
        method: 'GET',
        url: url + `file/${req.params.dataId}`,
        headers: header,
        body: "{}",
        json: true
    }, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(body)
    })
})


// POST route to upload files - unsure if it works tbh
app.post('/file', (req, res) => {
  request({
    method: 'POST',
        url: url + 'file',
        headers: {
            "apikey": "e71923092c4c1f8bc318e615d892aa23"
        },
        body: req.body,
        json: true
    }, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(body)
    })
})


const port = process.env.port || 3003

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})