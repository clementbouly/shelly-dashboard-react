import { useEffect, useState } from "react"
import { Device } from "../../model/device.model"
import { deviceService } from "../../services/device.service"
import DeviceComponent from "../device/device.component"
import style from "./devicesList.module.css"

const DevicesListComponent = () => {
	const [devices, setDevices] = useState<Device[]>([])

	useEffect(() => {
		;(async () => {
			try {
				const devicesConfig = await deviceService.getDevicesConfig()
				setDevices(devicesConfig)
				const devicesUpdated: Device[] = []

				const getStatusPromises = devicesConfig.map(async (device: Device) => {
					try {
						const relays = await deviceService.getRelaysStatus(device.id)
						devicesUpdated.push({
							...device,
							relays,
						})
					} catch (error) {
						console.error("Error fetching device id : ", device.id,  error)
					}
				})

				await Promise.all(getStatusPromises) // Wait for all promises to resolve
				setDevices(devicesUpdated)
			} catch (error) {
				console.error(error)
			}
		})()
	}, [])

	const updateStatus = (id: number, relayIndex: number, relayStatus: boolean) => {
		setDevices(
			(prev) =>
				prev.map((device) => {
					if (device.id === id) {
						return {
							...device,
							relays: device.relays?.map((relay, index) => {
								if (index === relayIndex) {
									return {
										...relay,
										ison: relayStatus,
									}
								}
								return relay
							}),
						}
					}
					return device
				}) || []
		)
	}

	return (
		<>
			<div className={style.itemList}>
				{devices
					.sort((a: Device, b: Device) => a.order - b.order)
					.map((device: Device) => (
						<DeviceComponent key={device.id} {...device} updateStatus={updateStatus} />
					))}
			</div>
		</>
	)
}

export default DevicesListComponent
