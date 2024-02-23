import { useQuery, useQueryClient } from "@tanstack/react-query"
import { memo } from "react"
import { Device, PilotedType, Relay } from "../../model/device.model"
import { API_URL, deviceService } from "../../services/device.service"
import styles from "./device.module.css"
import DeviceActionsComponent from "./deviceActions/deviceActions.component"
import DeviceStatusComponent from "./deviceStatus/deviceStatus.component"
import SettingIcon from "/src/assets/setting-svgrepo-com.svg?react"

interface DeviceComponentProps extends Device {}

const DeviceComponent = ({ ...props }: DeviceComponentProps) => {
	const queryClient = useQueryClient()

	const updateRelaysStatus = async (id: number) => {
		const relays = await deviceService.getRelaysStatus(id)
		queryClient.setQueryData(["devices"], (oldDevices: Device[]) => {
			return oldDevices.map((oldDevice) => {
				if (oldDevice.id === id) {
					return { ...oldDevice, relays: relays }
				}
				return oldDevice
			})
		})
		return relays
	}

	const { error, isLoading } = useQuery<Relay[], Error>({
		queryKey: ["relays", props.id],
		queryFn: () => updateRelaysStatus(props.id),
		enabled: props.hasStatus,
		retry: false,
	})

	return (
		<span className={styles.card}>
			<h2>{props.name}</h2>
			<DeviceActionsComponent {...props} />

			{props.pilotedType !== PilotedType.NONE && (
				<a href={`${API_URL}.${props.id}`}>
					<SettingIcon className={styles.icon__setting} />
				</a>
			)}

			{props.hasStatus && <DeviceStatusComponent {...props} />}
			{isLoading && <p>Loading...</p>}
			{error && (
				<p className={styles.error}>
					Erreur
					<span className={styles.tooltiptext}>Impossible de se connecter au module Shelly</span>
				</p>
			)}
		</span>
	)
}

export default memo(DeviceComponent)
