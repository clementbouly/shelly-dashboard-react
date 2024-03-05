type FooterProps = {
	updateBackground: () => void
}

export function Footer({ updateBackground }: FooterProps) {
	return (
		<footer className="footer" onClick={updateBackground}>
			<h1>Shelly Dashboard v3.0</h1>
		</footer>
	)
}
