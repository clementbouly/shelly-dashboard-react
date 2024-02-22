import { motion } from "framer-motion"
import { Device, PilotedType, RelayActionType } from "../../../model/device.model"
import { API_URL, deviceService } from "../../../services/device.service"
import ModalComponent from "../../../shared/modal.component"
import RelayToggleButton from "./RelayToggleButton/relayToggleButton.component"
import styles from "./deviceActions.module.css"
import { ReactComponent as ExternalLinkIcon } from "/src/assets/external-link.svg"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const DeviceActionsComponent = (props: Device) => {
	const queryClient = useQueryClient()

	const toggleRelayMutation = useMutation({
		mutationKey: ["toggleRelay"],
		mutationFn: ({ id, relayIndex, status }: { id: number; relayIndex: number; status: RelayActionType }) =>
			deviceService.toggleRelay(id, relayIndex, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["relays"] })
		},
	})
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleModal = () => {
		setIsModalOpen(true)
	}

	const handleSimpleRelayAction = () => {
		toggleRelayMutation.mutate(
			{
				id: props.id,
				relayIndex: 0,
				status: RelayActionType.ON,
			},
			{
				onSuccess: () => {
					console.log(`${props.name} is OPENING/CLOSING`)
				},
			}
		)
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
		toggleRelayMutation.mutate({
			id: props.id,
			relayIndex: index,
			status: e.target.checked ? RelayActionType.ON : RelayActionType.OFF,
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
