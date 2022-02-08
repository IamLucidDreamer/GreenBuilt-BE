import { Request, Response } from 'express'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'

interface Product {
	title: string
	description?: string
	points: number
	photo?: string
}

export const createProduct = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const product: Product = req.body.product

	try {
		await prisma.product
			.create({
				data: {
					...product,
					productId: uuid(),
					userId
				}
			})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Product created successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Product creation failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Product API Called!`)
	}
}

export const getProduct = async (req: Request, res: Response): Promise<any> => {
	const productId = req.params.productId
	try {
		await prisma.product
			.findUnique({
				where: {
					productId
				}
			})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Corporate Product fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the corporate product!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Corporate Product API Called!`)
	}
}

export const getAllCorporateProducts = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	try {
		await prisma.product
			.findMany({
				where: {
					userId: userId
				}
			})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Corporate Products fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the corporate products!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Corporate Products API Called!`)
	}
}

export const getAllProducts = async (_: any, res: Response): Promise<any> => {
	try {
		await prisma.product
			.findMany({})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All Products fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the products!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Products API Called!`)
	}
}

export const deleteProduct = async (
	req: Request,
	res: Response
): Promise<any> => {
	const productId = req.params.productId

	try {
		await prisma.product
			.delete({
				where: {
					productId
				}
			})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Product deleted successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Product deletion failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Delete Product API Called!`)
	}
}

export const approveProduct = async (
	req: Request,
	res: Response
): Promise<any> => {
	const productId = req.params.productId

	try {
		await prisma.product
			.update({
				where: {
					productId
				},
				data: {
					isApproved: true
				}
			})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Product approved successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Product approval failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Approve Product API Called!`)
	}
}

export const updateProductPoints = async (
	req: Request,
	res: Response
): Promise<any> => {
	const productId = req.params.productId
	const points =
		typeof req.body.points === 'string'
			? parseInt(req.body.points)
			: req.body.points || 0

	try {
		await prisma.product
			.findUnique({
				where: {
					productId
				}
			})
			.then(async product => {
				await prisma.product
					.update({
						where: {
							id: product?.id
						},
						data: {
							points: (product?.points || 0) + points
						}
					})
					.then(data => {
						return res.status(SC.OK).json({
							message: 'Product approved successfully!',
							data
						})
					})
					.catch(err => {
						logger(err, 'ERROR')
						return res.status(SC.BAD_REQUEST).json({
							error: 'Product approval failed!'
						})
					})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.NOT_FOUND).json({
					error: 'NO product found!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Approve Product API Called!`)
	}
}
