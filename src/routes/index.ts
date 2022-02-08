import { Application } from 'express'
import { isSignedIn, isValidToken } from './../middlewares/index'
import { authRoute } from './auth'
import { userRoute } from './user'
import { qrRoute } from './qrCode'
import { productRoute } from './product'

export const routes = (app: Application) => {
	app.use('/api', authRoute)
	app.use('/api', isSignedIn, isValidToken, userRoute)
	app.use('/api', isSignedIn, isValidToken, qrRoute)
	app.use('/api', isSignedIn, isValidToken, productRoute)

	return app
}
