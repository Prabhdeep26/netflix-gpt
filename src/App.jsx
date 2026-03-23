import React from "react";
import Login from "./Components/Login";
import Browse from "./Components/Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/browse",
			element: <Browse />,
		},
	]);

	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	);
};

export default App;
