import { render, screen } from "@testing-library/react"
import DeviceStatusComponent from "./deviceStatus.component"

const RELAYS_ON = [{ ison: true }, { ison: true }]
const RELAYS_OFF = [{ ison: false }, { ison: false }]
const RELAYS_MIXED = [{ ison: true }, { ison: false }]
// const RELAYS_ONLY_ONE = [{ ison: true }]

describe("DeviceStatus", () => {
	test("renders correctly 2 status led if both relays are defined", () => {
		render(<DeviceStatusComponent relays={RELAYS_MIXED} />)
		const leds = screen.getAllByTestId(/status-led/)
		expect(leds).toHaveLength(2)
	})

	test("correctly sets the LED color if both relays are on", () => {
		render(<DeviceStatusComponent relays={RELAYS_ON} />)

		const firstLed = screen.getByTestId("status-led-0")
		const secondLed = screen.getByTestId("status-led-1")

		expect(firstLed).toHaveStyle(`background-color: #abff00`)
		expect(secondLed).toHaveStyle(`background-color: #abff00`)
	})

	test("correctly sets the LED color if both relays are off", () => {
		render(<DeviceStatusComponent relays={RELAYS_OFF} />)
		const firstLed = screen.getByTestId("status-led-0")
		const secondLed = screen.getByTestId("status-led-1")

		expect(firstLed).toHaveStyle(`background-color: #dee0db`)
		expect(secondLed).toHaveStyle(`background-color: #dee0db`)
	})

	test("correctly sets the LED color if one relay is on and the other is off", () => {
		render(<DeviceStatusComponent relays={RELAYS_MIXED} />)

		const firstLed = screen.getByTestId("status-led-0")
		const secondLed = screen.getByTestId("status-led-1")

		expect(firstLed).toHaveStyle(`background-color: #abff00`)
		expect(secondLed).toHaveStyle(`background-color: #dee0db`)
	})

	test("display correct relay number with 2 relays", () => {
		render(<DeviceStatusComponent relays={RELAYS_MIXED} />)

		const firstLed = screen.getByTestId("status-led-0")
		const secondLed = screen.getByTestId("status-led-1")

		expect(firstLed).toHaveTextContent("1")
		expect(secondLed).toHaveTextContent("2")
	})

	test("display red error (E) if there are no relays ", () => {
		render(<DeviceStatusComponent relays={undefined} />)

		const errorLed = screen.getByTestId("error-led")

		expect(errorLed).toHaveTextContent("E")
		expect(errorLed).toHaveStyle(`background-color: #ff0000`)
		expect(errorLed).toBeInTheDocument()
	})
})
