import { DEVICES } from "../../data/devices"
import { Device } from "../../model/device.model"
import DeviceComponent from "../device/device.component"
import style from "./devicesList.module.css"

interface DevicesListProps {
	filter: string
}

const DevicesListComponent = ({ filter }: DevicesListProps) => {
	const devices: Device[] = DEVICES
	return (
		<>
			<div className={style.itemList}>
				{devices
					.filter((device: Device) => device.name.includes(filter))
					.map((device: Device) => (
						<DeviceComponent key={device.id} {...device} />
					))}
			</div>
		</>
	)
}

export default DevicesListComponent
