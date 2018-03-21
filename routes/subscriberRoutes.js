import express from 'express'
const router = express.Router()

import * as UserController from '../controllers/userController'
import { STATUS_CODE, ERROR_MESSAGE } from '../utils/constants'
import { isValidEmail } from '../utils/validationUtils'

/**
 * @swagger
 * /subscribers:
 *   put:
 *     description: Subscribe requestor to listen to target user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: requestor
 *         description: user subscribing to listen for updates
 *         in: body
 *         required: true
 *         type: string
 *       - name: target
 *         description: user whose updates to listen
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *       409:
 *          description: error when wrong input
 *          schema:
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *                default: false
 *              error:
 *                type: string
 *              
 *              
 */
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

/**
 * @swagger
 * /subscribers:
 *   delete:
 *     description: Unsubscribe requestor from listening to target user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: requestor
 *         description: user unsubscribing from listening
 *         in: body
 *         required: true
 *         type: string
 *       - name: target
 *         description: user whose updates are being listened to
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *       409:
 *          description: error when wrong input
 *          schema:
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *                default: false
 *              error:
 *                type: string
 *              
 *              
 */
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

/**
 * @swagger
 * /subscribers:
 *   get:
 *     description: Get subscribers listening to a particular user, optionally adding subscribers from @mentions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: sender
 *         description: email of user whose subscribers' list is requested
 *         in: query
 *         required: true
 *         type: string
 *       - name: text
 *         description: free text by sender, optionally containing @mentions for any users
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *           type: object
 *           properties:
 *             recipients:
 *               type: array
 *               description: list of subscribers
 *               items:
 *                 type: string
 *                 description: subscriber's email
 *             success:
 *               type: boolean
 *               default: true
 *       409:
 *          description: error when wrong input
 *          schema:
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *                default: false
 *              error:
 *                type: string
 *              
 *              
 */
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