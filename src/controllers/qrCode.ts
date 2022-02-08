import { Response, Request } from 'express'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'

export const generateQRCode = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const productId = req.params.productId
	try {
		await prisma.product
			.findUnique({
				where: {
					productId
				}
			})
			.then(async product => {
				if (!product?.isApproved) {
					res.status(SC.BAD_REQUEST).json({
						error:
							'Given product is not present or not approved to generate QR!'
					})
				} else {
					await prisma.user
						.findUnique({
							where: {
								id: userId
							}
						})
						.then(async user => {
							if ((user?.points || 0) >= (product?.points || 0)) {
								await prisma.user
									.update({
										where: {
											id: user?.id
										},
										data: {
											points: (user?.points || 0) - (product?.points || 0)
										}
									})
									.then(async () => {
										await prisma.qRCode
											.create({
												data: {
													qrId: uuid(),
													productId,
													userId: userId
												}
											})
											.then(qr => {
												return res.status(SC.OK).json({
													message: 'QR Code generated successfully!',
													data: qr
												})
											})
											.catch(err => {
												logger(err, 'ERROR')
												return res.status(SC.BAD_REQUEST).json({
													error: 'Failed to generate QR code'
												})
											})
									})
							} else {
								res.status(SC.BAD_REQUEST).json({
									error: 'Insufficient points to generate QR!'
								})
							}
						})
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Generate QR Code API Called!`)
	}
}

export const consumeQRCode = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const qrId: string = req.params.qrId
	try {
		await prisma.qRCode
			.findUnique({
				where: {
					qrId
				}
			})
			.then(async qr => {
				if (qr?.redeemed) {
					res.status(SC.BAD_REQUEST).json({
						message: 'QR code has been already used!'
					})
				} else {
					await prisma.product
						.findFirst({
							where: {
								productId: qr?.productId || ''
							}
						})
						.then(async product => {
							await prisma.user
								.findUnique({
									where: {
										id: userId
									}
								})
								.then(async user => {
									await prisma.user
										.update({
											where: {
												id: userId
											},
											data: {
												points: (user?.points || 0) + (product?.points || 0)
											}
										})
										.then(async usr => {
											await prisma.qRCode
												.update({
													where: {
														id: qr?.id
													},
													data: {
														redeemed: true
													}
												})
												.then(async () => {
													await prisma.usedQRCode
														.create({
															data: {
																qrId: qrId,
																userId,
																productId: product?.productId,
																redeemed: true
															}
														})
														.then(() => {
															return res.status(SC.OK).json({
																message: 'QR code consumed successfully',
																pointsConsumed: product?.points,
																availableUserPoints: usr?.points,
																data: product
															})
														})
														.catch(err => {
															logger(err, 'ERROR')
															return res.status(SC.BAD_REQUEST).json({
																error: 'Failed to consume QR Code!'
															})
														})
												})
										})
								})
						})
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Consume QR Code API Called!`)
	}
}

export const getGeneratedQRs = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = parseInt(req.params.userId || '1')
	const redeemed = req.query?.redeemed
	try {
		await prisma.qRCode
			.findMany({
				where: {
					userId: userId,
					redeemed: redeemed === 'true' ? true : undefined
				}
			})
			.then(async qr => {
				const arr: object[] = []
				if (!qr.length) {
					res.status(SC.NOT_FOUND).json({
						error: 'No QR found!'
					})
				} else {
					await qr.forEach(
						async data =>
							await prisma.product
								.findUnique({
									where: {
										productId: data.productId || ''
									}
								})
								.then(product => {
									arr.push({
										qrId: data.qrId,
										isRedeemed: data.redeemed,
										product: product
									})
									if (qr.length === arr.length) {
										res.status(SC.OK).json({
											message: 'Generate QR history fetched successfully!',
											data: arr,
											count: arr?.length
										})
									}
								})
								.catch(err => {
									logger(err, 'ERROR')
									res.status(SC.INTERNAL_SERVER_ERROR).json({
										error: 'Failed to fetch Generate QR history'
									})
								})
					)
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Generated QRs API Called!`)
	}
}

export const getConsumedQRs = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = parseInt(req.params.userId || '1')
	const redeemed = req.query?.redeemed
	try {
		await prisma.usedQRCode
			.findMany({
				where: {
					userId: userId,
					redeemed: redeemed === 'true' ? true : undefined
				}
			})
			.then(async qr => {
				if (!qr.length) {
					res.status(SC.NOT_FOUND).json({
						error: 'No QR found!'
					})
				} else {
					const arr: object[] = []
					await qr.forEach(
						async data =>
							await prisma.product
								.findUnique({
									where: {
										productId: data.productId || ''
									}
								})
								.then(product => {
									arr.push({
										qrId: data.qrId,
										isRedeemed: data.redeemed,
										product: product
									})
									if (qr.length === arr.length) {
										res.status(SC.OK).json({
											message: 'Consume QR history fetched successfully!',
											data: arr,
											count: arr?.length
										})
									}
								})
								.catch(err => {
									logger(err, 'ERROR')
									res.status(SC.INTERNAL_SERVER_ERROR).json({
										error: 'Failed to fetch consumed QR history'
									})
								})
					)
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Consumed QRs API Called!`)
	}
}
