import express from 'express'
const router = express.Router()

import * as UserController from '../controllers/userController'
import { STATUS_CODE, ERROR_MESSAGE } from '../utils/constants'
import { isValidEmail } from '../utils/validationUtils'

router.put('/', (req, res, next) => {
    const { requestor, target } = req.body || {}

    if (isValidEmail(requestor) && isValidEmail(target)) {
        UserController.subscribeToUser(target, requestor)
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

router.delete('/', (req, res, next) => {
    const { requestor, target } = req.body || {}

    if (isValidEmail(requestor) && isValidEmail(target)) {
        UserController.unsubscribeFromUser(target, requestor)
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
    const { sender, text } = req.query || {}

    if (isValidEmail(sender)) {
        UserController.getSubscribers(sender, text)
            .then(subscribers => {
                res.status(STATUS_CODE.SUCCESS).json({
                    success: true,
                    recipients: subscribers
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