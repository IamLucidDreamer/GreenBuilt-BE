"use strict";
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
exports.getConsumedQRs = exports.getGeneratedQRs = exports.consumeQRCode = exports.generateQRCode = void 0;
var index_1 = require("../prisma/index");
var logger_1 = require("../utils/logger");
var statusCode_1 = require("../utils/statusCode");
var uuid_1 = require("uuid");
var generateQRCode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, productId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
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
                        .then(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!(product === null || product === void 0 ? void 0 : product.isApproved)) return [3, 1];
                                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        error: 'Given product is not present or not approved to generate QR!'
                                    });
                                    return [3, 3];
                                case 1: return [4, index_1.prisma.user
                                        .findUnique({
                                        where: {
                                            id: userId
                                        }
                                    })
                                        .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(((user === null || user === void 0 ? void 0 : user.points) || 0) >= ((product === null || product === void 0 ? void 0 : product.points) || 0))) return [3, 2];
                                                    return [4, index_1.prisma.user
                                                            .update({
                                                            where: {
                                                                id: user === null || user === void 0 ? void 0 : user.id
                                                            },
                                                            data: {
                                                                points: ((user === null || user === void 0 ? void 0 : user.points) || 0) - ((product === null || product === void 0 ? void 0 : product.points) || 0)
                                                            }
                                                        })
                                                            .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4, index_1.prisma.qRCode
                                                                            .create({
                                                                            data: {
                                                                                qrId: (0, uuid_1.v4)(),
                                                                                productId: productId,
                                                                                userId: userId
                                                                            }
                                                                        })
                                                                            .then(function (qr) {
                                                                            return res.status(statusCode_1.statusCode.OK).json({
                                                                                message: 'QR Code generated successfully!',
                                                                                data: qr
                                                                            });
                                                                        })
                                                                            .catch(function (err) {
                                                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                                                            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                                error: 'Failed to generate QR code'
                                                                            });
                                                                        })];
                                                                    case 1:
                                                                        _a.sent();
                                                                        return [2];
                                                                }
                                                            });
                                                        }); })];
                                                case 1:
                                                    _a.sent();
                                                    return [3, 3];
                                                case 2:
                                                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                        error: 'Insufficient points to generate QR!'
                                                    });
                                                    _a.label = 3;
                                                case 3: return [2];
                                            }
                                        });
                                    }); })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_1 = _a.sent();
                (0, logger_1.loggerUtil)(err_1, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Generate QR Code API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.generateQRCode = generateQRCode;
var consumeQRCode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, qrId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.auth._id;
                qrId = req.params.qrId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.qRCode
                        .findUnique({
                        where: {
                            qrId: qrId
                        }
                    })
                        .then(function (qr) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(qr === null || qr === void 0 ? void 0 : qr.redeemed)) return [3, 1];
                                    res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                        message: 'QR code has been already used!'
                                    });
                                    return [3, 3];
                                case 1: return [4, index_1.prisma.product
                                        .findFirst({
                                        where: {
                                            productId: (qr === null || qr === void 0 ? void 0 : qr.productId) || ''
                                        }
                                    })
                                        .then(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4, index_1.prisma.user
                                                        .findUnique({
                                                        where: {
                                                            id: userId
                                                        }
                                                    })
                                                        .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4, index_1.prisma.user
                                                                        .update({
                                                                        where: {
                                                                            id: userId
                                                                        },
                                                                        data: {
                                                                            points: ((user === null || user === void 0 ? void 0 : user.points) || 0) + ((product === null || product === void 0 ? void 0 : product.points) || 0)
                                                                        }
                                                                    })
                                                                        .then(function (usr) { return __awaiter(void 0, void 0, void 0, function () {
                                                                        return __generator(this, function (_a) {
                                                                            switch (_a.label) {
                                                                                case 0: return [4, index_1.prisma.qRCode
                                                                                        .update({
                                                                                        where: {
                                                                                            id: qr === null || qr === void 0 ? void 0 : qr.id
                                                                                        },
                                                                                        data: {
                                                                                            redeemed: true
                                                                                        }
                                                                                    })
                                                                                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                                                        return __generator(this, function (_a) {
                                                                                            switch (_a.label) {
                                                                                                case 0: return [4, index_1.prisma.usedQRCode
                                                                                                        .create({
                                                                                                        data: {
                                                                                                            qrId: qrId,
                                                                                                            userId: userId,
                                                                                                            productId: product === null || product === void 0 ? void 0 : product.productId,
                                                                                                            redeemed: true
                                                                                                        }
                                                                                                    })
                                                                                                        .then(function () {
                                                                                                        return res.status(statusCode_1.statusCode.OK).json({
                                                                                                            message: 'QR code consumed successfully',
                                                                                                            pointsConsumed: product === null || product === void 0 ? void 0 : product.points,
                                                                                                            availableUserPoints: usr === null || usr === void 0 ? void 0 : usr.points,
                                                                                                            data: product
                                                                                                        });
                                                                                                    })
                                                                                                        .catch(function (err) {
                                                                                                        (0, logger_1.loggerUtil)(err, 'ERROR');
                                                                                                        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                                                                                                            error: 'Failed to consume QR Code!'
                                                                                                        });
                                                                                                    })];
                                                                                                case 1:
                                                                                                    _a.sent();
                                                                                                    return [2];
                                                                                            }
                                                                                        });
                                                                                    }); })];
                                                                                case 1:
                                                                                    _a.sent();
                                                                                    return [2];
                                                                            }
                                                                        });
                                                                    }); })];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2];
                                                            }
                                                        });
                                                    }); })];
                                                case 1:
                                                    _a.sent();
                                                    return [2];
                                            }
                                        });
                                    }); })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3, 5];
            case 3:
                err_2 = _a.sent();
                (0, logger_1.loggerUtil)(err_2, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Consume QR Code API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.consumeQRCode = consumeQRCode;
var getGeneratedQRs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, redeemed, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = parseInt(req.params.userId || '1');
                redeemed = (_a = req.query) === null || _a === void 0 ? void 0 : _a.redeemed;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.qRCode
                        .findMany({
                        where: {
                            userId: userId,
                            redeemed: redeemed === 'true' ? true : undefined
                        }
                    })
                        .then(function (qr) { return __awaiter(void 0, void 0, void 0, function () {
                        var arr;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    arr = [];
                                    if (!!qr.length) return [3, 1];
                                    res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                        error: 'No QR found!'
                                    });
                                    return [3, 3];
                                case 1: return [4, qr.forEach(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4, index_1.prisma.product
                                                        .findUnique({
                                                        where: {
                                                            productId: data.productId || ''
                                                        }
                                                    })
                                                        .then(function (product) {
                                                        arr.push({
                                                            qrId: data.qrId,
                                                            isRedeemed: data.redeemed,
                                                            product: product
                                                        });
                                                        if (qr.length === arr.length) {
                                                            res.status(statusCode_1.statusCode.OK).json({
                                                                message: 'Generate QR history fetched successfully!',
                                                                data: arr,
                                                                count: arr === null || arr === void 0 ? void 0 : arr.length
                                                            });
                                                        }
                                                    })
                                                        .catch(function (err) {
                                                        (0, logger_1.loggerUtil)(err, 'ERROR');
                                                        res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                                                            error: 'Failed to fetch Generate QR history'
                                                        });
                                                    })];
                                                case 1: return [2, _a.sent()];
                                            }
                                        });
                                    }); })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); })];
            case 2:
                _b.sent();
                return [3, 5];
            case 3:
                err_3 = _b.sent();
                (0, logger_1.loggerUtil)(err_3, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get Generated QRs API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getGeneratedQRs = getGeneratedQRs;
var getConsumedQRs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, redeemed, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = parseInt(req.params.userId || '1');
                redeemed = (_a = req.query) === null || _a === void 0 ? void 0 : _a.redeemed;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, 4, 5]);
                return [4, index_1.prisma.usedQRCode
                        .findMany({
                        where: {
                            userId: userId,
                            redeemed: redeemed === 'true' ? true : undefined
                        }
                    })
                        .then(function (qr) { return __awaiter(void 0, void 0, void 0, function () {
                        var arr_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!qr.length) return [3, 1];
                                    res.status(statusCode_1.statusCode.NOT_FOUND).json({
                                        error: 'No QR found!'
                                    });
                                    return [3, 3];
                                case 1:
                                    arr_1 = [];
                                    return [4, qr.forEach(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4, index_1.prisma.product
                                                            .findUnique({
                                                            where: {
                                                                productId: data.productId || ''
                                                            }
                                                        })
                                                            .then(function (product) {
                                                            arr_1.push({
                                                                qrId: data.qrId,
                                                                isRedeemed: data.redeemed,
                                                                product: product
                                                            });
                                                            if (qr.length === arr_1.length) {
                                                                res.status(statusCode_1.statusCode.OK).json({
                                                                    message: 'Consume QR history fetched successfully!',
                                                                    data: arr_1,
                                                                    count: arr_1 === null || arr_1 === void 0 ? void 0 : arr_1.length
                                                                });
                                                            }
                                                        })
                                                            .catch(function (err) {
                                                            (0, logger_1.loggerUtil)(err, 'ERROR');
                                                            res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                                                                error: 'Failed to fetch consumed QR history'
                                                            });
                                                        })];
                                                    case 1: return [2, _a.sent()];
                                                }
                                            });
                                        }); })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); })];
            case 2:
                _b.sent();
                return [3, 5];
            case 3:
                err_4 = _b.sent();
                (0, logger_1.loggerUtil)(err_4, 'ERROR');
                return [3, 5];
            case 4:
                (0, logger_1.loggerUtil)("Get Consumed QRs API Called!");
                return [7];
            case 5: return [2];
        }
    });
}); };
exports.getConsumedQRs = getConsumedQRs;
//# sourceMappingURL=qrCode.js.map