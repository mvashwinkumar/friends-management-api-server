import express from 'express'

import friendRouteHandler from './friendRoutes'
import subscriberRouteHandler from './subscriberRoutes'

const router = express.Router()

// route handlers
router.use('/friends', friendRouteHandler)
router.use('/subscribers', subscriberRouteHandler)

export default router