import express from 'express'
import {
	createProduct,
	getProduct,
	getAllCorporateProducts,
	getAllProducts,
	updateProductPoints,
	approveProduct,
	deleteProduct
} from '../controllers/product'
import { isCorporate, isAdmin } from './../middlewares/index'

const productRoute = express.Router()

productRoute.post('/product/create', isCorporate, createProduct)
productRoute.get('/product/get/:productId', isCorporate, getProduct)
productRoute.get(
	'/product/get-all/corporate',
	isCorporate,
	getAllCorporateProducts
)
productRoute.get('/product/get-all/admin', isCorporate, getAllProducts)
productRoute.delete('/product/delete/:productId', isCorporate, deleteProduct)
productRoute.put(
	'/product/update-points/:productId',
	isAdmin,
	updateProductPoints
)
productRoute.put('/product/approve/:productId', isAdmin, approveProduct)

export { productRoute }
