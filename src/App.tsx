import "./App.css"
import DevicesListComponent from "./components/devicesList/devicesList.component"
import { Footer } from "./components/footer/footer.component"
import { DevicesStoreProvider } from "./store/devices.store"
import { updateBackground } from "./utils/background.tsx"

function App() {
	return (
		<DevicesStoreProvider>
			<DevicesListComponent />
			<Footer updateBackground={updateBackground} />
		</DevicesStoreProvider>
	)
}

export default App
