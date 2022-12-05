import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Binary from "./components/binary";
import Index from "./components/index";

import "./assets/index.scss";

// react router
const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />,
	},
	{
		path: "/binary",
		element: <Binary />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

