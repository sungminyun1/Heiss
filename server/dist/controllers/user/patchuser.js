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
var jwt = require("jsonwebtoken");
var users = require("../../models").users;
var bcrypt = require("bcrypt");
require("dotenv").config();
module.exports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, _a, userName, newpassword, userInfo, payload, salt, hash, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accessToken = req.cookies.accessToken;
                _a = req.body, userName = _a.userName, newpassword = _a.newpassword;
                return [4 /*yield*/, jwt.verify(accessToken, process.env.ACCESS_SECRET)];
            case 1:
                userInfo = _b.sent();
                payload = {};
                if (req.file) {
                    userInfo.profileImg = req.file.location;
                    payload.profileImg = req.file.location;
                }
                if (userName) {
                    userInfo.userName = userName;
                    payload.userName = userName;
                }
                if (!newpassword) return [3 /*break*/, 7];
                salt = void 0, hash = void 0;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(newpassword, salt)];
            case 4:
                hash = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                res.status(500).send(console.log(err_1));
                return [3 /*break*/, 6];
            case 6:
                payload.password = hash;
                _b.label = 7;
            case 7:
                delete userInfo.password;
                try {
                    users
                        .update(payload, {
                        where: { email: userInfo.email, provider: userInfo.provider },
                    })
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var accessToken;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, jwt.sign(userInfo, process.env.ACCESS_SECRET)];
                                case 1:
                                    accessToken = _a.sent();
                                    return [2 /*return*/, res
                                            .cookie("accessToken", accessToken, { httpOnly: true })
                                            .status(200)
                                            .json({ message: "ok" })];
                            }
                        });
                    }); });
                }
                catch (err) {
                    res.status(500).send(console.log(err));
                }
                return [2 /*return*/];
        }
    });
}); };
