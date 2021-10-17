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
var _a = require("../../models"), review = _a.review, source = _a.source, customCase = _a.customCase;
var jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, _a, score, title, desc, caseId, deleteUrl, accessToken, imgUrl, userInfo, findReview, urlList, _i, urlList_1, url, i, findCase, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                reviewId = req.params.id;
                _a = req.body, score = _a.score, title = _a.title, desc = _a.desc, caseId = _a.caseId, deleteUrl = _a.deleteUrl;
                accessToken = req.cookies.accessToken;
                imgUrl = req.files;
                console.log(deleteUrl);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 21, , 22]);
                return [4 /*yield*/, jwt.verify(accessToken, process.env.ACCESS_SECRET)];
            case 2:
                userInfo = _b.sent();
                return [4 /*yield*/, review.findOne({
                        where: { id: reviewId },
                        include: [{ model: source, attributes: ["imgUrl"] }],
                    })];
            case 3:
                findReview = _b.sent();
                if (!findReview) {
                    res.status(404).json({ message: "Not found post" });
                }
                if (!(userInfo.id === findReview.dataValues.userId)) return [3 /*break*/, 19];
                urlList = [];
                if (deleteUrl) {
                    urlList = deleteUrl.split(",");
                }
                if (!urlList.length) return [3 /*break*/, 7];
                _i = 0, urlList_1 = urlList;
                _b.label = 4;
            case 4:
                if (!(_i < urlList_1.length)) return [3 /*break*/, 7];
                url = urlList_1[_i];
                return [4 /*yield*/, source.destroy({ where: { reviewId: reviewId, imgUrl: url } })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                if (!imgUrl.length) return [3 /*break*/, 12];
                i = 0;
                _b.label = 8;
            case 8:
                if (!(i < imgUrl.length)) return [3 /*break*/, 11];
                return [4 /*yield*/, source.create({
                        reviewId: reviewId,
                        imgUrl: imgUrl[i].location,
                    })];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10:
                i++;
                return [3 /*break*/, 8];
            case 11: return [3 /*break*/, 15];
            case 12:
                if (!(!imgUrl.length &&
                    !(findReview.dataValues.sources.length - urlList.length))) return [3 /*break*/, 15];
                return [4 /*yield*/, customCase.findOne({ where: { id: caseId } })];
            case 13:
                findCase = _b.sent();
                return [4 /*yield*/, source.create({
                        reviewId: reviewId,
                        imgUrl: findCase.dataValues.img,
                    })];
            case 14:
                _b.sent();
                _b.label = 15;
            case 15:
                if (!(score && title && desc && caseId)) return [3 /*break*/, 17];
                return [4 /*yield*/, review.update({ score: score, title: title, desc: desc, caseId: caseId }, {
                        where: { id: reviewId },
                    })];
            case 16:
                _b.sent();
                res.status(200).json({ message: "ok" });
                return [3 /*break*/, 18];
            case 17:
                res.status(422).json({ message: "insufficient parameters supplied" });
                _b.label = 18;
            case 18: return [3 /*break*/, 20];
            case 19:
                res.status(401).json({ message: "Unauthorized request" });
                _b.label = 20;
            case 20: return [3 /*break*/, 22];
            case 21:
                err_1 = _b.sent();
                res.status(500).send(console.log(err_1));
                return [3 /*break*/, 22];
            case 22: return [2 /*return*/];
        }
    });
}); };
