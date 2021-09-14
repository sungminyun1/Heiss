module.exports = {
	//* user
	oauth: require("./user/oauth"),
	signup: require("./user/signup"),
	emailcode: require("./user/emailcode"),
	emailcheck: require("./user/emailcheck"),
	signin: require("./user/signin"),
	signout: require("./user/signout"),

	//* review
	getAllReview: require("./review/getAllReview"),
	getDetailReview: require("./review/getDetailReview"),
	postReview: require("./review/postReview"),
	patchReview: require("./review/patchReview"),
	deleteReview: require("./review/deleteReview"),
	postLikeReview: require("./review/postLikeReview"),
};
