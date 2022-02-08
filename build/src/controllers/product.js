"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductPoints = exports.approveProduct = exports.deleteProduct = exports.getAllProducts = exports.getAllCorporateProducts = exports.getProduct = exports.createProduct = void 0;
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, product, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                product = req.body.product;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .create({
                        data: __assign(__assign({}, product), { productId: (0, uuid_1.v4)(), userId: userId })
                    })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Product created successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Product creation failed!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_1 = _a.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Create Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.createProduct = createProduct;
var getProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .findUnique({
                        where: {
                            productId: productId
                        }
                    })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Corporate Product fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the corporate product!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_2 = _a.sent();
                (0, logger_1.loggerUtil)(err_2, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get Corporate Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getProduct = getProduct;
var getAllCorporateProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .findMany({
                        where: {
                            userId: userId
                        }
                    })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Corporate Products fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the corporate products!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_3 = _a.sent();
                (0, logger_1.loggerUtil)(err_3, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get All Corporate Products API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getAllCorporateProducts = getAllCorporateProducts;
var getAllProducts = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4, index_1.prisma.product
                        .findMany({})
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'All Products fetched successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Failed to fetch the products!'
                        });
                    })];
            case 1:
                _a.sent();
                return [3, 4];
            case 2:
                err_4 = _a.sent();
                (0, logger_1.loggerUtil)(err_4, 'ERROR');
                return [3, 4];
            case 3:
                (0, logger_1.loggerUtil)("Get All Products API Called!");
                return [7];
            case 4: return [2];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .delete({
                        where: {
                            productId: productId
                        }
                    })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Product deleted successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Product deletion failed!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_5 = _a.sent();
                (0, logger_1.loggerUtil)(err_5, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Delete Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var approveProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .update({
                        where: {
                            productId: productId
                        },
                        data: {
                            isApproved: true
                        }
                    })
                        .then(function (data) {
                        return res.status(statusCode_1.statusCode.OK).json({
                            message: 'Product approved successfully!',
                            data: data
                        });
                    })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                            error: 'Product approval failed!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_6 = _a.sent();
                (0, logger_1.loggerUtil)(err_6, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Approve Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.approveProduct = approveProduct;
var updateProductPoints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, points, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                points = typeof req.body.points === 'string'
                    ? parseInt(req.body.points)
                    : req.body.points || 0;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.product
                        .findUnique({
                        where: {
                            productId: productId
                        }
                    })
                        .then(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, index_1.prisma.product
                                        .update({
                                        where: {
                                            id: product === null || product === void 0 ? void 0 : product.id
                                        },
                                        data: {
                                            points: ((product === null || product === void 0 ? void 0 : product.points) || 0) + points
                                        }
                                    })
                                        .then(function (data) {
                                        return res.status(statusCode_1.statusCode.OK).json({
                                            message: 'Product approved successfully!',
                                            data: data
                                        });
                                    })
                                        .catch(function (err) {
                                        (0, logger_1.loggerUtil)(err, 'ERROR');
                                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                            error: 'Product approval failed!'
                                        });
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        (0, logger_1.loggerUtil)(err, 'ERROR');
                        return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                            error: 'NO product found!'
                        });
                    })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_7 = _a.sent();
                (0, logger_1.loggerUtil)(err_7, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Approve Product API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.updateProductPoints = updateProductPoints;
//# sourceMappingURL=product.js.map