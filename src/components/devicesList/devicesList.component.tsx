import { useEffect, useState } from "react"
import { Device } from "../../model/device.model"
import DeviceComponent from "../device/device.component"
import style from "./devicesList.module.css"

interface DevicesListProps {
	filter: string
}

const DevicesListComponent = ({ filter }: DevicesListProps) => {
	const [devices, setDevices] = useState<Device[]>([])

	useEffect(() => {
		fetch("/config.json")
			.then((response) => response.json())
			.then((data: Device[]) => {
				setTimeout(() => {
					console.log("Devices fetched")

					setDevices(data)
				}, 1000)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	const updateStatus = (id: number) => {
		const updatedDevices = devices.map((device: Device) => {
			if (device.id !== id) {
				return device
			}
			return { ...device, status: !device.status }
		})

		setDevices(updatedDevices)
	}

	return (
		<>
			<div className={style.itemList}>
				{devices
					.filter((device: Device) => device.name.includes(filter))
					.map((device: Device) => (
							<DeviceComponent key={device.id} {...device} updateStatus={updateStatus} />
					))}
			</div>
		</>
	)
}

export default DevicesListComponent
