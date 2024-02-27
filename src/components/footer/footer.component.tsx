type FooterProps = {
	updateBackground: () => void
}

export function Footer({ updateBackground }: FooterProps) {
	return (
		<div className="footer" onClick={updateBackground} data-testid="footer">
			<h1>Shelly Dashboard v3.0</h1>
		</div>
	)
}
