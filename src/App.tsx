import "./App.css"
import DevicesListComponent from "./components/devicesList/devicesList.component"

function App() {
	const updateBackground = () => {
		const backgrounds = [
			" linear-gradient(to right, #11998e, #38ef7d)",
			"linear-gradient(to right, #000000, #000000)",
			"linear-gradient(to right, #4b79a1, #283e51)",
			"linear-gradient(to right, #0f2027, #203a43, #2c5364)",
			"linear-gradient(to right, #1e3c72, #2a5298)",
			"linear-gradient(to right, #1d4350, #a43931)",
			"linear-gradient(to right, #ff5f6d, #ffc371)",
			"linear-gradient(to right, #ff4b1f, #ff9068)",
		]
		const body = document.querySelector("body")
		if (body) {
			body.style.background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
		}
	}

	return (
		<>
			<span className="header">
				<h1 onClick={updateBackground}>Shelly Dashboard v2.0</h1>
			</span>
			<DevicesListComponent />
		</>
	)
}

export default App
