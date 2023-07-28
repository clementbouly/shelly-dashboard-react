import { useEffect, useState } from "react"
import { Device } from "../../model/device.model"
import { deviceService } from "../../services/device.service"
import DeviceComponent from "../device/device.component"
import style from "./devicesList.module.css"

interface DevicesListProps {
	filter: string
}

const DevicesListComponent = ({ filter }: DevicesListProps) => {
	const [devices, setDevices] = useState<Device[]>([])

	useEffect(() => {
		;(async () => {
			try {
				const devicesConfig = await deviceService.getDevicesConfig()
				const devicesUpdated: Device[] = []

				const getStatusPromises = devicesConfig.map(async (device: Device) => {
					try {
						const relays = await deviceService.getRelaysStatus(device.id)
						devicesUpdated.push({
							...device,
							relays,
						})
					} catch (error) {
						console.error(error)
					}
				})

				

				await Promise.all(getStatusPromises) // Wait for all promises to resolve
				setDevices(devicesUpdated)
			} catch (error) {
				console.error(error)
			}
		})()
	}, [])

	const updateStatus = (id: number) => {
		console.log("updateStatus", id)
	}

	return (
		<>
			<div className={style.itemList}>
				{devices
					.filter((device: Device) => device.name.includes(filter))
					.sort((a: Device, b: Device) => a.order - b.order)
					.map((device: Device) => (
						<DeviceComponent key={device.id} {...device} updateStatus={updateStatus} />
					))}
			</div>
		</>
	)
}

export default DevicesListComponent
