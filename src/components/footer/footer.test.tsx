import { render, screen } from "@testing-library/react"
import { expect, test, vitest } from "vitest"
import { Footer } from "./footer.component"

test("renders initial footer text with correct version number", () => {
	render(<Footer updateBackground={() => {}} />)
	const footer = screen.getByText(/Shelly Dashboard v/)
	expect(footer).toBeInTheDocument()
})

test("clicking on footer triggers updateBackground function", () => {
	const updateBackground = vitest.fn()
	render(<Footer updateBackground={updateBackground} />)
	const footer = screen.getByTestId("footer")
	footer.click()
	expect(updateBackground).toHaveBeenCalled()
})
