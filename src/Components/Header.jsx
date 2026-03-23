import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/langConstants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	};

	const handleGptSearchClick = () => {
		dispatch(toggleGptSearchView());
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(addUser({ uid, email, displayName, photoURL }));
				navigate("/browse");
			} else {
				dispatch(removeUser());
				navigate("/");
			}
		});

		return () => unsubscribe();
	}, []);

	const handleLanguageChange = (e) => {
		console.log(e.target.value);
		dispatch(changeLanguage(e.target.value))
		
	};

	return (
		<div className="absolute px-8 py-2 bg-linear-to-b from-black/90 flex flex-col items-center w-full z-10 md:flex-row md:justify-between">
			<img src={LOGO} alt="logo" className="w-42" />

			{user && (
				<div className="flex items-center ">
					{showGptSearch && (
						<select
							className="bg-gray-100 m-2 focus:outline-0"
							onChange={handleLanguageChange}
						>
							{SUPPORTED_LANGUAGES.map((lang) => (
								<option
									key={lang.identifier}
									value={lang.identifier}
								>
									{lang.name}
								</option>
							))}
						</select>
					)}
					<button
						className="bg-red-500 text-white py-1 px-4 rounded-2xl mx-4"
						onClick={handleGptSearchClick}
					>
						{showGptSearch ? "Home Page" : "GPT Search"}
					</button>
					<img
						className="w-8 h-fit rounded-sm"
						src={user.photoURL}
						alt="user icon"
					/>
					<button
						onClick={handleSignOut}
						className="font-bold text-white"
					>
						(Sign Out)
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
