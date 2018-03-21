import express from 'express'
const router = express.Router()

/*
#4 PUT /subscribers
#5 DELETE /subscribers
#6 GET /subscribers
*/

router.put('/', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "PUT /subscribers" })
})

router.delete('/', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "DELETE /subscribers" })
})

router.get('/', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "GET /subscribers" })
})

export default router