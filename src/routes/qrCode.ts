import express from 'express'
import {
	generateQRCode,
	consumeQRCode,
	getGeneratedQRs,
	getConsumedQRs
} from '../controllers/qrCode'
import { isCorporate } from './../middlewares/index'

const qrRoute = express.Router()

qrRoute.post('/qr/generate/:productId', isCorporate, generateQRCode)
qrRoute.post('/qr/consume/:qrId', consumeQRCode)
qrRoute.get('/qr/history/generate/:userId', isCorporate, getGeneratedQRs)
qrRoute.get('/qr/history/consume/:userId', getConsumedQRs)

export { qrRoute }
