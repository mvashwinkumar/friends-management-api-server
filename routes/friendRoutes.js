var express = require('express')
var router = express.Router()

/*
#1 POST /friends/connection
#2 GET /friends
#3 GET /friends/common
*/

router.post('/connection', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "POST /friends/connection" })
})

router.get('/', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "GET /friends" })
})

router.get('/common', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "GET /friends/common" })
})

module.exports = router