import express from 'express'
const router = express.Router()

import * as UserController from '../controllers/userController'
import { STATUS_CODE, ERROR_MESSAGE } from '../utils/constants'
import { isValidEmail } from '../utils/validationUtils'

/**
 * @swagger
 * /friends/connection:
 *   post:
 *     description: Make friend connection between two users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: friends
 *         description: get common friends between two user emails.
 *         in: body
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *           minimum: 2
 *           maximum: 2
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

/**
 * @swagger
 * /friends:
 *   get:
 *     description: Get friends for a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: get friends for user email.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *           type: object
 *           properties:
 *             friends:
 *               type: array
 *               description: list of friends
 *               items:
 *                 type: string
 *                 description: friend user email
 *             success:
 *               type: boolean
 *               default: true
 *             count:
 *               type: number
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

/**
 * @swagger
 * /friends/common:
 *   get:
 *     description: Get common friends between two users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: emails
 *         description: get common friends between two user emails.
 *         in: query
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *           minimum: 2
 *           maximum: 2
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *           type: object
 *           properties:
 *             friends:
 *               type: array
 *               description: list of common friends
 *               items:
 *                 type: string
 *                 description: friend user email
 *             success:
 *               type: boolean
 *               default: true
 *             count:
 *               type: number
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