const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs").promises
const cors = require("cors")

const app = express()
const port = 3000 // You can change the port as needed

// Middleware
app.use(bodyParser.json())

// CORS for react app, assuming port 5173
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
)

// File path
const filePath = "data/devices.json"

// Function to read data from the JSON file
async function readData() {
	try {
		const data = await fs.readFile(filePath)
		return JSON.parse(data)
	} catch (error) {
		console.error("Error reading data:", error)
		throw error
	}
}

// Function to write data to the JSON file
async function writeData(data) {
	try {
		await fs.writeFile(filePath, JSON.stringify(data, null, 2))
	} catch (error) {
		console.error("Error writing data:", error)
		throw error
	}
}

// Route to get relays status
app.get("/:id/status", async (req, res) => {
	try {
		const devices = await readData()
		const { id } = req.params
		const device = devices.find((device) => device.id === parseInt(id))
		if (device) {
			if (device.relays.length === 0) {
				res.status(502).json({ message: "Error getting relays" })
			} else {
				res.json({ relays: device.relays })
			}
		} else {
			res.status(404).json({ message: "Device not found" })
		}
	} catch (error) {
		console.error("Error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
})

// Route to toggle relay status
app.get("/:id/relay/:relayIndex", async (req, res) => {
	try {
		const devices = await readData()
		const { id, relayIndex } = req.params
		const device = devices.find((device) => device.id === parseInt(id))
		if (device) {
			const index = parseInt(relayIndex)
			// Ensure the relay index is within the bounds of the array
			if (index >= 0 && index < device.relays.length) {
				const relay = device.relays[index]
				relay.ison = req.query.turn === "on" // Turn relay on or off based on the query parameter
				await writeData(devices) // Persist the change to the file
				res.json({ success: true, message: `Relay ${index} of device ${id} turned ${req.query.turn}.` })
			} else {
				if (device.pilotedType === "SIMPLE") {
					res.status(200).json({ message: "Device activated" })
				} else {
					res.status(404).json({ message: "Relay not found" })
				}
			}
		} else {
			res.status(404).json({ message: "Device not found" })
		}
	} catch (error) {
		console.error("Error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
})

// Route to get all devices
app.get("/devices", async (req, res) => {
	try {
		const devices = await readData()
		res.json(devices)
	} catch (error) {
		console.error("Error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
})

// Start the server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
