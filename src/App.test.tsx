import { getByRole, render } from "@testing-library/react"
import { expect, test } from "vitest"
import App from "./App"

test("renders initial footer text with correct version number", () => {
	render(<App />)
	const footerElement = getByRole(document.body, "heading")
	expect(footerElement.textContent).toMatch("Shelly Dashboard v3.0")
})
