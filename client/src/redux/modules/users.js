import axios from "axios";
axios.defaults.withCredentials = true;

// actions type
const GET_LOGIN = "GET_LOGIN";
const GET_LOGOUT = "GET_LOGOUT";
const HANDLE_LOGIN_MODAL = "HANDLE_LOGIN_MODAL";
const GET_LOCKER = "GET_LOCKER";
const GET_CART = "GET_CART";
const GET_ORDER = "GET_ORDER";

// action
export const getUserInfo = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}user`).then((el) => {
		if (el.data.userInfo) {
			dispatch(getLogin(el.data.userInfo));
		}
	});
};

export const newUserInfo = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}user/mypage`).then((el) => {
		if (el.data.userInfo) {
			dispatch(getLogin(el.data.userInfo));
		}
	});
};

export const getUserOrder = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}order`).then((el) => {
		if (el.data) {
			dispatch(getorder(el.data));
		}
	});
};

export const getUserLocker = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}locker`).then((el) => {
		if (el.data.data) {
			dispatch(getLocker(el.data.data));
		}
	});
};

export const getUserCart = () => (dispatch) => {
	axios.get(`${process.env.REACT_APP_API_URL}cart`).then((el) => {
		if (el.data.data) {
			dispatch(getcart(el.data.data));
		}
	});
};

export const getLogin = (data) => {
	return {
		type: GET_LOGIN,
		payload: data,
	};
};

export const getLocker = (data) => {
	return {
		type: GET_LOCKER,
		payload: data,
	};
};

export const getorder = (data) => {
	return {
		type: GET_ORDER,
		payload: data,
	};
};

export const getcart = (data) => {
	return {
		type: GET_CART,
		payload: data,
	};
};

export const getLogout = () => {
	return {
		type: GET_LOGOUT,
	};
};

export const handleLoginModal = () => {
	return {
		type: HANDLE_LOGIN_MODAL,
	};
};

// initialState
const initialState = {
	userInfo: {},
	isLogin: false,
	loginModal: false,
	userCart: [],
	userOrder: [],
};

// reducer
export const users = (state = initialState, action) => {
	switch (action.type) {
		case GET_LOGIN:
			return { ...state, userInfo: action.payload, isLogin: true };

		case GET_LOGOUT:
			return { ...state, userInfo: {}, isLogin: false };

		case GET_LOCKER:
			return { ...state, userlocker: action.payload };

		case GET_ORDER:
			return { ...state, userOrder: action.payload };

		case GET_CART:
			return { ...state, userCart: action.payload };

		case HANDLE_LOGIN_MODAL:
			return {
				...state,
				loginModal: !state.loginModal,
			};

		default:
			return state;
	}
};

export default users;
