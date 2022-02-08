"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
var express_1 = __importDefault(require("express"));
var product_1 = require("../controllers/product");
var index_1 = require("./../middlewares/index");
var productRoute = express_1.default.Router();
exports.productRoute = productRoute;
productRoute.post('/product/create', index_1.isCorporate, product_1.createProduct);
productRoute.get('/product/get/:productId', index_1.isCorporate, product_1.getProduct);
productRoute.get('/product/get-all/corporate', index_1.isCorporate, product_1.getAllCorporateProducts);
productRoute.get('/product/get-all/admin', index_1.isCorporate, product_1.getAllProducts);
productRoute.delete('/product/delete/:productId', index_1.isCorporate, product_1.deleteProduct);
productRoute.put('/product/update-points/:productId', index_1.isAdmin, product_1.updateProductPoints);
productRoute.put('/product/approve/:productId', index_1.isAdmin, product_1.approveProduct);
//# sourceMappingURL=product.js.map