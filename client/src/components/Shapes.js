import React, { useRef } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { listBox } from "./utils/theme";
import { color } from "./utils/theme";

// 이미지
import rectIcon from "../img/Rectangle.svg";
import circleIcon from "../img/Ellipse 3.svg";
import triangleIcon from "../img/triangle.svg";
import polygonIcon from "../img/Polygon1.svg";
import Polygon from "../img/Polygon.svg";

// svg 배열화
const svgs = require.context("../img/shape", true, /\.svg$/);
const keys = svgs.keys();
const svgArr = keys.map((path) => svgs(path).default);

const ShapesSection = styled.div`
	${listBox}

	.circle {
		height: 7rem;
		@media ${(props) => props.theme.tablet} {
			height: 3rem;
		}
	}
`;

const Shapes = ({ canvas }) => {
	const onClick = (el) => {
		switch (el) {
			case "rect":
				const rect = new fabric.Rect({
					left: 300,
					top: 300,
					fill: "red",
					width: 40,
					height: 40,
					angle: 45,
				});
				return canvas.add(rect);
			case "circle":
				const circle = new fabric.Circle({
					radius: 50,
					fill: "green",
					// stroke: "green",
					// strokeWidth: 3,
				});
				return canvas.add(circle);
			case "triangle":
				const triangle = new fabric.Triangle({
					left: 500,
					top: 500,
					fill: "black",
					width: 20,
					height: 20,
					angle: 45,
				});
				return canvas.add(triangle);
			default:
				return "";
		}
	};

	const handleAddShape = (id) => {
		const svgObj = svgArr[id];

		fabric.loadSVGFromURL(svgObj, (objects, options) => {
			objects.forEach((object) => {
				object.set({
					scaleX: 1,
					scaleY: 1,
				});

				canvas.add(object);
			});
		});
	};

	const rowScroll = useRef();

	let offset = 0;

	window.addEventListener("wheel", (e) => {
		offset += Math.sign(e.deltaY) * 60;
		console.log(rowScroll);
		if (offset < 0) {
			offset = 0;
		} else if (offset > 10000 - window.innerWidth) {
			offset = 10000 - window.innerWidth;
		}

		rowScroll.style.transform = `translateX(-${offset}px`;
	});

	return (
		<ShapesSection ref={rowScroll}>
			<button onClick={() => onClick("rect")} className="rect">
				<img src={rectIcon} alt="recIcon" />
			</button>
			<button onClick={() => onClick("circle")}>
				<img src={circleIcon} alt="circleIcon" className="circle" />
			</button>
			<button onClick={() => onClick("triangle")}>
				<img src={triangleIcon} alt="triangleIcon" />
			</button>
			{svgArr.map((svg, num) => (
				<button onClick={() => handleAddShape(num)}>
					<img src={svg} alt="num" />
				</button>
			))}
		</ShapesSection>
	);
};

export default Shapes;
