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
var dotenv = require("dotenv");
var axios = require("axios");
var model = require("../../models");
var jwt = require("jsonwebtoken");
dotenv.config();
axios.defaults.withCredentials = true;
module.exports = function (req, res) {
    var _a = req.body, authorizationCode = _a.authorizationCode, platform = _a.platform;
    console.log("~~~~~~oauth~~~~~");
    if (platform === "kakao") {
        axios
            .post("https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=" + process.env.KAKAO_CLIENT_ID + "&redirect_uri=" + process.env.REDIRECT_URI + "&code=" + authorizationCode + "&client_secret=" + process.env.KAKAO_CLIENT_SECRET, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (response) {
            var _a = response.data, access_token = _a.access_token, refresh_token = _a.refresh_token;
            axios
                .get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: "Bearer " + access_token,
                    "Content-type": "application/x-www-form-urlencoded",
                },
            })
                .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                var email, username, profileImage, user, findUser, accessToken, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = response.data.kakao_account.email;
                            username = response.data.properties.nickname;
                            profileImage = response.data.properties.profile_image;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 8, , 9]);
                            console.log(email);
                            return [4 /*yield*/, model.users.findOne({
                                    where: { email: email, provider: "kakao" },
                                })];
                        case 2:
                            user = _a.sent();
                            if (!user) return [3 /*break*/, 3];
                            console.log("가입되어있는 kakao 유저. 바로 로그인 진행");
                            return [3 /*break*/, 5];
                        case 3:
                            console.log("첫 로그인 kakao, DB 저장 후 로그인 진행");
                            return [4 /*yield*/, model.users.create({
                                    userName: username,
                                    email: email,
                                    profileImg: profileImage,
                                    provider: "kakao",
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [4 /*yield*/, model.users.findOne({
                                where: { email: email, provider: "kakao" },
                            })];
                        case 6:
                            findUser = _a.sent();
                            delete findUser.dataValues.password;
                            return [4 /*yield*/, jwt.sign(findUser.dataValues, process.env.ACCESS_SECRET)];
                        case 7:
                            accessToken = _a.sent();
                            res
                                .status(200)
                                .cookie("accessToken", accessToken, {
                                httpOnly: true,
                            })
                                .json({ message: "ok" });
                            return [3 /*break*/, 9];
                        case 8:
                            err_1 = _a.sent();
                            console.log("kakao DB 입출력 오류");
                            res.send("kakao DB 입출력 오류");
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (err) {
                console.log(err);
                res.send("kakao 유저 정보 가져오기 오류");
            });
        })
            .catch(function (err) {
            console.log(err);
            res.send("kakao accesstoken 받기 오류");
        });
    }
    else if (platform === "naver") {
        //네이버 로그인
        axios
            .get("https://nid.naver.com/oauth2.0/token", {
            params: {
                grant_type: "authorization_code",
                client_id: process.env.NAVER_CLIENT_ID,
                client_secret: process.env.NAVER_CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                code: authorizationCode,
                state: "naver",
            },
        })
            .then(function (response) {
            var _a = response.data, access_token = _a.access_token, refresh_token = _a.refresh_token;
            axios
                .get("https://openapi.naver.com/v1/nid/me", {
                headers: {
                    Authorization: "Bearer " + access_token,
                },
            })
                .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                var email, username, profileImage, user, findUser, accessToken, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = response.data.response.email;
                            username = response.data.response.nickname;
                            profileImage = response.data.response.profile_image;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 8, , 9]);
                            return [4 /*yield*/, model.users.findOne({
                                    where: { email: email, provider: "naver" },
                                })];
                        case 2:
                            user = _a.sent();
                            if (!user) return [3 /*break*/, 3];
                            console.log("가입되어있는 naver 유저. 바로 로그인 진행");
                            return [3 /*break*/, 5];
                        case 3:
                            console.log("첫 로그인 naver, DB 저장 후 로그인 진행");
                            return [4 /*yield*/, model.users.create({
                                    userName: username,
                                    email: email,
                                    profileImg: profileImage,
                                    provider: "naver",
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [4 /*yield*/, model.users.findOne({
                                where: { email: email, provider: "naver" },
                            })];
                        case 6:
                            findUser = _a.sent();
                            delete findUser.dataValues.password;
                            return [4 /*yield*/, jwt.sign(findUser.dataValues, process.env.ACCESS_SECRET)];
                        case 7:
                            accessToken = _a.sent();
                            res
                                .status(200)
                                .cookie("accessToken", accessToken, {
                                httpOnly: true,
                            })
                                .json({ message: "ok" });
                            return [3 /*break*/, 9];
                        case 8:
                            err_2 = _a.sent();
                            console.log(err_2);
                            res.send("naver DB 입출력 에러");
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (err) {
                console.log(err);
                res.send("naver 유저 정보 받기 에러");
            });
        })
            .catch(function (err) {
            console.log(err);
            res.send("naver 토큰 받기 에러");
        });
    }
};
//https://kauth.kakao.com/oauth/authorize?client_id=7904e316af3f17cb62573b7acbc2bee1&redirect_uri=http://localhost:3000&response_type=code&state=kakao
//https://kauth.kakao.com/oauth/authorize?client_id=7904e316af3f17cb62573b7acbc2bee1&redirect_uri=https://heiss.shop&response_type=code&state=kakao
//https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=PXdmwzsrOkyH0uRxF3pw&redirect_uri=http://localhost:3000&state=naver
