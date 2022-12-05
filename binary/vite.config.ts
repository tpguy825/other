import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: {
			"~bootstrap": path.join(__dirname, "..", "node_modules/bootstrap"),
			"~root": path.join(__dirname, ".."),
			"~binary": __dirname,
		},
	},
});
