import React from "react";

const VideoTitle = ({ title, overview }) => {
	return (
		<div className="w-full aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-linear-to-r from-black">
			<h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
			<p className="hidden md:inline-block py-6 text-lg w-2/5">{overview}</p>
			<div className="my-4 md:m-0">
				<button className="bg-white text-lg py-1 px-3 md:text-xl md:py-2 md:px-6 rounded-lg text-black hover:bg-gray-300">
					<i className="ri-play-large-fill"></i>Play
				</button>
				<button className="hidden md:inline-block bg-gray-700 mx-2 text-xl py-2 px-3 rounded-lg text-white opacity-80 hover:bg-gray-500">
					<i className="ri-information-line"></i> More Info
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
