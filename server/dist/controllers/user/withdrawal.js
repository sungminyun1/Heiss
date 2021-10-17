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
var users = require("../../models").users;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
require("dotenv").config();
module.exports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, provider, accessToken, userInfo, email, findUser, check, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, password = _a.password, provider = _a.provider;
                accessToken = req.cookies.accessToken;
                return [4 /*yield*/, jwt.verify(accessToken, process.env.ACCESS_SECRET)];
            case 1:
                userInfo = _b.sent();
                email = userInfo.email;
                return [4 /*yield*/, users.findOne({
                        where: { email: email, provider: userInfo.provider },
                    })];
            case 2:
                findUser = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, , 9]);
                return [4 /*yield*/, bcrypt.compare(password, findUser.password)];
            case 4:
                check = _b.sent();
                if (!check) return [3 /*break*/, 6];
                return [4 /*yield*/, users.destroy({
                        where: { email: userInfo.email, provider: userInfo.provider },
                    })];
            case 5:
                _b.sent();
                res
                    .cookie("accessToken", "", { httpOnly: true, maxAge: 1 })
                    .status(200)
                    .json({ message: "ok" });
                return [3 /*break*/, 7];
            case 6:
                if (!check) {
                    res.status(200).json({ message: "not found" });
                }
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _b.sent();
                console.log(err_1);
                res.status(500).send();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
