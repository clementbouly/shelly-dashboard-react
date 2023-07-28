import { Device } from "../../../model/device.model"
import { deviceService } from "../../../services/device.service"
import styles from "./deviceActions.module.css"

import { useState } from "react"

interface DeviceActionsProps extends Device {
	updateStatus: (id: number, relayIndex: number, relayStatus: boolean) => void
}

const DeviceActionsComponent = ({ updateStatus, ...props }: DeviceActionsProps) => {
	const [isActive, setIsActive] = useState(false)

	const handleClick = () => {
		setIsActive(true)
		setTimeout(() => {
			setIsActive(false)
		}, 300)
		deviceService
			.toggleRelay(props.id, 0, props.relays?.[0].ison ? "off" : "on")
			.then((data) => {
				updateStatus(props.id, 0, data.ison)
			})
			.catch((error) => {
				console.log("error", error)
			})
	}

	return (
		<div className={`${styles.action__button} ${isActive ? styles.active : ""}`} onClick={handleClick}>
			<img className={styles.icon} src={props.icon} alt={props.name} />
		</div>
	)
}

export default DeviceActionsComponent
