import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
	if (!movies) return;
	return (
		<div className="px-6 pb-5">
			<h1 className=" text-white text-lg md:text-2xl py-2">{title}</h1>
			<div className="flex overflow-x-scroll [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				<div className="flex gap-3">
					{movies.map((movie) => {
						return <MovieCard key={movie?.id} image={movie?.poster_path} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default MovieList;
