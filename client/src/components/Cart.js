import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserCart } from "../redux/modules/users";
import { flexCenter, ThumbnailSections, color, size } from "./utils/theme";
import axios from "axios";
import CartList from "./CartList";
import Pay from "./Pay";
import { useDispatch, useSelector } from "react-redux";

const CartSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;

	.column {
		${flexCenter}
		flex-direction: column;
		width: 8rem;
		height: 8rem;
		min-width: 8rem;
		min-height: 8rem;

		h2 {
			margin-bottom: 1rem;
		}
	}
`;

const OrderBox = styled.div`
	${flexCenter};
	justify-content: space-around;
	width: 40rem;
	height: 20rem;
	border: 1px solid ${color.white};
	margin-top: 5rem;
	padding: 2rem;
	margin-bottom: 1rem;

	@media ${(props) => props.theme.tablet} {
		flex-direction: column;
		height: 30rem;
		width: 20rem;
	}

	@media ${(props) => props.theme.mobileL} {
		height: 35rem;
		width: 13rem;
	}
`;

const MoneyBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	width: 50%;

	h1,
	h2 {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	h3 {
		margin-bottom: 0.5rem;
		@media ${(props) => props.theme.tablet} {
			font-size: 1rem;
		}
		@media (max-width: 430px) {
			text-align: center;
		}
	}

	.plus {
		font-size: 3rem;
		color: ${color.point};
	}

	.all_money {
		font-size: 3rem;
		color: ${color.point};
		@media ${(props) => props.theme.tablet} {
			font-size: 2rem;
		}
		@media (max-width: 430px) {
			font-size: 1.5rem;
		}
	}

	.allPrice {
		font-size: 1.5rem;
		margin-bottom: 0.8rem;
		font-weight: bold;
		@media (max-width: 430px) {
			font-size: 1.2rem;
			margin-bottom: 2rem;
		}
	}
`;

const Shipping = styled.div`
	${flexCenter};
	flex-direction: column;

	h2 {
		margin-bottom: 1rem;
	}

	input {
		width: 13rem;
		border-radius: 2vh;
		@media ${(props) => props.theme.tablet} {
			&::placeholder {
				font-size: 1rem;
			}
		}
	}

	div {
		font-size: 1.5rem;
		width: 50%;
	}
`;

const Cart = ({ name }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	// ??? ?????????
	const [delivery, setDelivery] = useState(2000);
	// ??? ?????????
	const [money, setMoney] = useState(0);
	// ?????? ???
	const [address, setAddress] = useState(true);
	// ?????? ??????
	const [addressName, setAddressName] = useState("");
	const [orders, setOrders] = useState(user.userCart);

	useEffect(() => {
		dispatch(getUserCart());
	}, []);

	useEffect(() => {
		if (user.userCart) {
			let arr = [];
			for (let el of user.userCart) {
				let payload = {
					customCaseId: el.customCase.id,
					quantity: el.quantity,
				};
				arr.push(payload);
			}
			setOrders(arr);
		}
	}, [user.userCart]);

	// ???????????? ?????????
	const changeHandler = (moneys, data, toggle) => {
		// ?????? ????????? ?????? ?????? ??????, ?????? ???????????? ????????? ????????? ??????
		// ????????? ???????????? ???????????? ?????? ????????? ????????? ??????
		setMoney((money) => {
			return money + moneys;
		});

		let quantity = data.quantity;
		let customCaseId = data.customCase.id;
		let payload = { quantity, customCaseId };

		//?????????????????? ????????? ????????? ???????????? orders??? ????????? ??????
		//????????? ??????????????? toggle????????? ????????? ????????? ?????????
		//orders??? ???????????? customCaseId??? ????????? ????????????.
		if (toggle === true) {
			setOrders(orders.filter((el) => el.customCaseId !== customCaseId));
		} else if (typeof toggle === "number") {
			let copyArr = orders.slice();
			for (let i = 0; i < copyArr.length; i++) {
				if (copyArr[i].customCaseId === customCaseId) {
					copyArr[i].quantity = toggle;
					setOrders([...copyArr]);
					break;
				}
			}
		} else {
			setOrders([...orders, payload]);
		}
	};

	// ??????
	const addressHandler = (e) => {
		setAddressName(e.target.value);
	};

	function enterkey() {
		if (window.event.keyCode === 13) {
			setAddress(!address);
		}
	}

	return (
		<CartSection>
			{user.userCart.map((data, el) => (
				<CartList
					data={data}
					key={el}
					copyKey={el}
					num={el}
					changeHandler={changeHandler}
				/>
			))}
			<OrderBox>
				<Shipping>
					<h2>????????????</h2>
					{address ? (
						<input
							placeholder="????????? ????????? ??????????????????"
							onChange={addressHandler}
							onKeyUp={enterkey}
							value={addressName}
						/>
					) : (
						<div onClick={() => setAddress(!address)}>{addressName}</div>
					)}
				</Shipping>
				<MoneyBox>
					<p className="allPrice">??? ?????? ??????</p>
					<h3>??? ?????? ?????? {money}???</h3>
					<h3 className="plus">+</h3>
					<h3>??? ????????? {money === 0 ? 0 : delivery}???</h3>
					<h1 className="all_money">{money === 0 ? 0 : money + delivery}???</h1>
				</MoneyBox>
			</OrderBox>
			<Pay
				orders={orders}
				address={addressName}
				price={money + delivery}
				name={name}
			/>
		</CartSection>
	);
};

export default Cart;
