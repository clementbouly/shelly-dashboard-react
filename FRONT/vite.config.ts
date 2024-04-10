import react from "@vitejs/plugin-react"
/// <reference types="vite-plugin-svgr/client" />
import { defineConfig } from "vite"

import svgr from "vite-plugin-svgr"

export default defineConfig(() => ({
	plugins: [react(), svgr()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./tests/setup.js",
	},
}))
