import { render, screen } from "@testing-library/react"
import { expect, test, vitest } from "vitest"
import { Footer } from "./footer.component"

describe("Footer", () => {
	test("renders initial footer text with correct version number", () => {
		render(<Footer updateBackground={() => {}} />)
		const footerText = screen.getByText(/Shelly Dashboard v/)
		expect(footerText).toBeInTheDocument()
	})

	test("clicking on footer triggers updateBackground function", () => {
		const updateBackground = vitest.fn()
		render(<Footer updateBackground={updateBackground} />)
		const footer = screen.getByRole("contentinfo")
		footer.click()
		expect(updateBackground).toHaveBeenCalled()
	})
})
