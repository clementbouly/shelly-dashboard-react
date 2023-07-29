import { Device, PilotedType, Relay, RelayActionType } from "../../../model/device.model"
import { API_URL, deviceService } from "../../../services/device.service"
import ModalComponent from "../../../shared/modal.component"
import styles from "./deviceActions.module.css"

import { useState } from "react"

interface DeviceActionsProps extends Device {
	updateStatus: (id: number, relayIndex: number, relayStatus: boolean) => void
}

const DeviceActionsComponent = ({ updateStatus, ...props }: DeviceActionsProps) => {
	const [isActive, setIsActive] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleAnimation = () => {
		setIsActive(true)
		setTimeout(() => {
			setIsActive(false)
		}, 300)
	}

	const handleModal = () => {
		setIsModalOpen(true)
	}

	const handleSimpleRelayAction = () => {
		deviceService
			.toggleRelay(props.id, 0, RelayActionType.ON)
			.then(() => {
				console.log(`${props.name} is OPENING/CLOSING`)
			})
			.catch((error) => {
				console.log("error", error)
			})
	}

	const goToDeviceSettings = () => {
		window.location.href = `${API_URL}.${props.id}`
	}

	const handleClick = () => {
		handleAnimation()

		switch (props.pilotedType) {
			case PilotedType.NONE:
				goToDeviceSettings()
				break
			case PilotedType.SIMPLE:
				handleSimpleRelayAction()
				break
			case PilotedType.DOUBLE:
				handleModal()
				break
			default:
				break
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		deviceService
			.toggleRelay(props.id, index, e.target.checked ? RelayActionType.ON : RelayActionType.OFF)
			.then((relayData: Relay) => {
				updateStatus(props.id, index, relayData.ison)
			})
			.catch((error) => {
				console.log("error", error)
			})
	}

	return (
		<>
			<div className={`${styles.action__button} ${isActive ? styles.active : ""}`} onClick={handleClick}>
				<img className={styles.icon} src={props.icon} alt={props.name} />
			</div>
			<ModalComponent title={props.name} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{props.relays?.map((relay, index) => (
					<div key={index}>
						<label className={styles.label}>Vitesse {index + 1}</label>
						<input
							className={styles.checkbox}
							checked={relay.ison}
							type="checkbox"
							onChange={(e) => handleChange(e, index)}
						/>
					</div>
				))}
			</ModalComponent>
		</>
	)
}

export default DeviceActionsComponent
