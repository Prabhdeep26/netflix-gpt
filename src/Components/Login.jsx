import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMsg, setErrorMsg] = useState(null);

	const dispatch = useDispatch();

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	const email = useRef(null);
	const password = useRef(null);
	const name = useRef(null);

	const handleButtonClick = () => {
		// Validate the form data

		const message = checkValidData(
			email.current.value,
			password.current.value,
		);
		setErrorMsg(message);

		if (message) return;

		// Sign In & Sign Up logic
		if (!isSignInForm) {
			// Sign Up logic
			createUserWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value,
				name.current.value,
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					console.log(user);
					updateProfile(auth.currentUser, {
						displayName: name.current.value,
						photoURL: USER_AVATAR,
					})
						.then(() => {
							// Profile updated!
							const { uid, email, displayName, photoURL } =
								auth.currentUser;
							dispatch(
								addUser({ uid, email, displayName, photoURL }),
							);
						})
						.catch((error) => {
							// An error occurred
							setErrorMsg(error.message);
						});

					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMsg(errorCode + "-" + errorMessage);
					// ..
				});
		} else {
			// Sign In logic
			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value,
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMsg(errorCode + "-" + errorMessage);
				});
		}

		// console.log(email.current.value);
	};

	return (
		<div>
			<Header />
			<div className="absolute w-full ">
				<img className="h-screen w-full object-cover" src={BG_URL} alt="" />
			</div>

			<form
				className="w-[80%] sm:w-4/5 md:w-3/6 lg:w-1/3 xl:w-1/4 p-4 sm:p-6 md:p-8 mx-auto my-8 sm:my-12 md:my-16 bg-black/80 text-white rounded-lg max-w-md absolute right-0 left-0 top-20"
				onSubmit={(e) => e.preventDefault()}
			>
				<h1 className="font-semibold text-2xl sm:text-3xl mx-2 my-3">
					{isSignInForm ? `Sign In` : `Sign Up`}
				</h1>
				{!isSignInForm && (
					<input
						ref={name}
						type="text"
						placeholder="Enter Full Name"
						className="p-2 m-2 bg-neutral-700 w-full sm:text-base rounded"
					/>
				)}
				<input
					ref={email}
					type="email"
					placeholder="Enter Email"
					className="p-2 m-2 bg-neutral-700 w-full sm:text-base rounded"
				/>
				<input
					ref={password}
					type="password"
					placeholder="Enter Password"
					className="p-2 m-2 bg-neutral-700 w-full sm:text-base rounded"
				/>
				<p className="text-red-600 text-sm mx-2">{errorMsg}</p>
				<button
					className="p-2 mx-2 my-4 w-full bg-red-600 cursor-pointer rounded-lg text-sm sm:text-base hover:bg-red-700 transition-colors"
					onClick={handleButtonClick}
				>
					{isSignInForm ? `Sign In` : `Sign Up`}
				</button>
				<p
					className="my-4 mx-2 text-sm font-medium cursor-pointer"
					onClick={toggleSignInForm}
				>
					{isSignInForm
						? `New to Netflix? Sign Up Now`
						: `Already Registerd? Sign In Now`}
				</p>
			</form>
		</div>
	);
};

export default Login;
