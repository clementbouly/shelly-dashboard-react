import { useState } from "react"
import "./App.css"
import DevicesListComponent from "./components/devicesList/devicesList.component"

function App() {
	const [filter, setFilter] = useState("")

	const updateBackground = () => {
		const backgrounds = [
			// black
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

	const updateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value)
	}

	return (
		<>
			<span className="header">
				<h1 onClick={updateBackground}>Shelly Dashboard v2.0</h1>
				<input type="text" onInput={updateFilter} />
			</span>
			<DevicesListComponent filter={filter} />
		</>
	)
}

export default App
