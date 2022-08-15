const express = require('express')
const cors = require('cors')
const request = require('request')
const app = express()
require('dotenv').config()
const multer = require('multer')

const upload = multer({})

app.use(express.json())
app.use(cors())

//****** INSERT API KEY BELOW ******
// const apikey = apiKeyGoesHere

const url = "https://api.metadefender.com/v4/"
const header = {"apikey": process.env.APIKEY || apikey}

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
app.post('/file', upload.single('file'), (req, res) => {
  request({
    method: 'POST',
        url: url + 'file',
        headers: {
            "apikey": process.env.APIKEY || apikey,
            "Content-Type": "multipart/form-data; boundary=--xx--"
        },
        body: req.file,
        json: true
    }, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(body)
    })
})


const port = 3003

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
