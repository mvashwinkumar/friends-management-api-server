import express from 'express'
const router = express.Router()

import * as UserController from '../controllers/userController'
import { STATUS_CODE, ERROR_MESSAGE } from '../utils/constants'
import { isValidEmail } from '../utils/validationUtils'

router.post('/connection', (req, res, next) => {
    const { friends = [] } = req.body || {}
    const [userOne, userTwo] = friends

    if (isValidEmail(userOne) && isValidEmail(userTwo)) {
        UserController.connectFriends(userOne, userTwo)
            .then(result => {
                res.status(STATUS_CODE.SUCCESS).json({ success: true })
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

router.get('/', (req, res, next) => {
    const { email } = req.query || {}
    if (isValidEmail(email)) {
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

router.get('/common', (req, res, next) => {
    const { emails = [] } = req.query || {}
    const [userOne, userTwo] = emails

    if (isValidEmail(userOne) && isValidEmail(userTwo)) {
        UserController.getCommonFriends(userOne, userTwo)
            .then(commonFriends => {
                res.status(STATUS_CODE.SUCCESS).json({
                    success: true,
                    friends: commonFriends,
                    count: commonFriends.length
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

export default router