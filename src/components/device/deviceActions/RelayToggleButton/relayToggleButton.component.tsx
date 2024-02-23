import { ChangeEvent, useState } from "react"
import { Relay } from "../../../../model/device.model"
import styles from "./relayToggleButton.module.css"
import SwitchIcon from "/src/assets/on-off.svg?react"

interface RelayToggleButtonProps {
	label: string
	relay: Relay
	index: number
	handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

const RelayToggleButton = (props: RelayToggleButtonProps) => {
	const [isActive, setIsActive] = useState(false)

	const handleAnimation = () => {
		setIsActive(true)
		setTimeout(() => {
			setIsActive(false)
		}, 1000)
	}

	const handleClick = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		handleAnimation()
		props.handleChange(e, index)
	}

	return (
		<div className={styles.container}>
			<label className={styles.label}>{props.label}</label>
			<div className={styles.container__checkbox + " " + (isActive ? styles.active : "")}>
				<input
					className={styles.checkbox}
					checked={props.relay.ison}
					type="checkbox"
					onChange={(e) => handleClick(e, props.index)}
				/>
				<div className={styles.light}> </div>
				<SwitchIcon className={styles.icon} />
			</div>
		</div>
	)
}

export default RelayToggleButton
