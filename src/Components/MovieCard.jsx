import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
const MovieCard = ({ image }) => {
	if (!image) return;
	return (
		<div className="w-30 md:w-50">
			<img src={IMG_CDN_URL + image} className="w-full" alt="" />
		</div>
	);
};

export default MovieCard;
