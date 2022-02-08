"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var auth_1 = require("../controllers/auth");
var index_1 = require("./../middlewares/index");
var authRoute = express_1.default.Router();
exports.authRoute = authRoute;
authRoute.post('/signup', [
    (0, express_validator_1.check)('name')
        .isLength({
        min: 3
    })
        .withMessage('Please provide a name'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Please provide a valid E-Mail!'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 6 })
        .withMessage('Password length should be minimum of 8 characters')
], auth_1.signup);
authRoute.post('/signin', [
    (0, express_validator_1.check)('email').isEmail().withMessage('Please provide a valid E-Mail!'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 6 })
        .withMessage('Password length should be minimum of 8 characters')
], auth_1.signin);
authRoute.get('/signout', auth_1.signout);
authRoute.put('/update/:userId', auth_1.update);
authRoute.put('/user/update-points/:userId', index_1.isSignedIn, index_1.isValidToken, index_1.isAdmin, auth_1.updateUserPoints);
authRoute.post('/user/approve/:userId', index_1.isSignedIn, index_1.isValidToken, index_1.isAdmin, auth_1.approveCorporateUser);
//# sourceMappingURL=auth.js.map