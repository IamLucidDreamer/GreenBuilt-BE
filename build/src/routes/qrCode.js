"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrRoute = void 0;
var express_1 = __importDefault(require("express"));
var qrCode_1 = require("../controllers/qrCode");
var index_1 = require("./../middlewares/index");
var qrRoute = express_1.default.Router();
exports.qrRoute = qrRoute;
qrRoute.post('/qr/generate/:productId', index_1.isCorporate, qrCode_1.generateQRCode);
qrRoute.post('/qr/consume/:qrId', qrCode_1.consumeQRCode);
qrRoute.get('/qr/history/generate/:userId', index_1.isCorporate, qrCode_1.getGeneratedQRs);
qrRoute.get('/qr/history/consume/:userId', qrCode_1.getConsumedQRs);
//# sourceMappingURL=qrCode.js.map