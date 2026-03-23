import React, { useRef } from "react";
import lang from "../utils/langConstants";
import { useDispatch, useSelector } from "react-redux";
import genAI from "../utils/googleAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptSearchResult } from "../utils/gptSlice";

const GptSearchBar = () => {
	const dispatch = useDispatch();
	const langKey = useSelector((store) => store.config.lang);
	const searchText = useRef(null);

	const searchMovieTMDB = async (movie) => {
		const data = await fetch(
			"https://api.themoviedb.org/3/search/movie?query=" +
				movie +
				"&include_adult=false&language=en-US&page=1",
			API_OPTIONS,
		);
		const json = await data.json();
		return json.results;
	};

	const handleGptSearchClick = async () => {

		const prompt = `
			You are a strict movie recommendation API.

			User query: "${searchText.current.value}"

			IMPORTANT INSTRUCTIONS:
			- Output must contain EXACTLY 5 movie names.
			- Output format: Movie1,Movie2,Movie3,Movie4,Movie5
			- No spaces after commas.
			- No explanation.
			- No introduction.
			- No notes.
			- No extra text.
			- No line breaks.
			- Only real, already released movies.
			- If the requested year is future or impossible, ignore the year and return closest relevant released movies.

			If you add anything other than the 5 comma-separated names, the response is invalid.

			Return output now.
			`;

		const model = genAI.getGenerativeModel({
			model: "gemini-3-flash-preview",
		});
		const result = await model.generateContent(prompt);

		const response = await result.response;
		const gptText = response.text();

		if (!gptText) {
			// TODO: write error handling
		}

		const getMovies = gptText.split(",");

		const promiseArray = getMovies.map((movie) => searchMovieTMDB(movie));
		const tmdbResults = await Promise.all(promiseArray);
		dispatch(
			addGptSearchResult({
				movieNames: getMovies,
				movieResults: tmdbResults,
			}),
		);
	};

	return (
		<div className="pt-[35%] flex justify-center md:pt-[10%] " >
			<form
				className="bg-black w-[90%] grid grid-cols-12 rounded-lg md:w-1/2"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					type="text"
					className="bg-white px-4 py-2 my-4 mx-2 md:p-4 md:m-4 col-span-9 rounded-xl"
					placeholder={lang[langKey].gptSearchPlaceholder}
					ref={searchText}
				/>
				<button
					className="bg-red-600 text-white px-4 py-2 my-4 mx-2 md:p-4 md:m-4 col-span-3 rounded-xl active:scale-95"
					onClick={handleGptSearchClick}
				>
					{lang[langKey].search}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
