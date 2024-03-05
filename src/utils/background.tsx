// Initialize a counter outside the function to keep track of the current background index
let currentBackgroundIndex = 0

export function updateBackground() {
	const backgrounds = [
		"linear-gradient(to right, #11998e, #38ef7d)",
		"linear-gradient(to right, #141414,#282828)",
		"linear-gradient(to right, #4b79a1, #283e51)",
		"linear-gradient(to right, #0f2027, #203a43, #2c5364)",
		"linear-gradient(to right, #1e3c72, #2a5298)",
		"linear-gradient(to right, #1d4350, #a43931)",
		"linear-gradient(to right, #ff5f6d, #ffc371)",
		"linear-gradient(to right, #ff4b1f, #ff9068)",
	]
	const body = document.querySelector("body")
	if (body) {
		// Set the background to the current index in the backgrounds array
		body.style.background = backgrounds[currentBackgroundIndex]

		// Increment the counter, and reset it if it exceeds the length of the backgrounds array
		currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length
	}
}
