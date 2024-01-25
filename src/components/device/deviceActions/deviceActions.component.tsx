import { motion } from "framer-motion"
import { Device, PilotedType, Relay, RelayActionType } from "../../../model/device.model"
import { API_URL, deviceService } from "../../../services/device.service"
import ModalComponent from "../../../shared/modal.component"
import RelayToggleButton from "./RelayToggleButton/relayToggleButton.component"
import styles from "./deviceActions.module.css"
import { ReactComponent as ExternalLinkIcon } from "/src/assets/external-link.svg"

import { useState } from "react"

interface DeviceActionsProps extends Device {
	updateStatus: (id: number, relayIndex: number, relayStatus: boolean) => void
}

const DeviceActionsComponent = ({ updateStatus, ...props }: DeviceActionsProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

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
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className={styles.action__button}
				onClick={handleClick}
			>
				{props.pilotedType === PilotedType.NONE && (
					<ExternalLinkIcon className={styles.icon__setting_redirect} />
				)}
				<img className={styles.icon} src={props.icon} alt={props.name} />
			</motion.button>
			<ModalComponent title={props.name} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{props.relays?.map((relay, index) => (
					<RelayToggleButton
						key={index}
						label={`Vitesse ${index + 1}`}
						relay={relay}
						index={index}
						handleChange={handleChange}
					/>
				))}
			</ModalComponent>
		</>
	)
}

export default DeviceActionsComponent
