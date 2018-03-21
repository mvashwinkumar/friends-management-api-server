import express from 'express'
const router = express.Router()

import * as UserController from '../controllers/userController'
import { STATUS_CODE, ERROR_MESSAGE } from '../utils/constants'

/*
#1 POST /friends/connection
#2 GET /friends
#3 GET /friends/common
*/

router.post('/connection', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "POST /friends/connection" })
})

router.get('/', function (req, res, next) {
    const { email } = req.query || {}
    if (email) {
        UserController.getFriends(email)
            .then(friends => {
                res.status(STATUS_CODE.SUCCESS).json({
                    success: true,
                    friends,
                    count: friends.length
                })
            })
            .catch(err => {
                res.status(STATUS_CODE.ILLEGAL_PARAMS).json({
                    success: false,
                    error: err
                })
            })
    } else {
        res.status(STATUS_CODE.ILLEGAL_PARAMS).json({
            success: false,
            error: ERROR_MESSAGE.ILLEGAL_PARAMS
        })
    }
})

router.get('/common', function (req, res, next) {
    res.status(200).json({ "success": true, "message": "GET /friends/common" })
})

export default router