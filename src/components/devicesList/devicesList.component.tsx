import { useQuery } from "@tanstack/react-query"
import { Device } from "../../model/device.model"
import { deviceService } from "../../services/device.service"
import DeviceComponent from "../device/device.component"
import style from "./devicesList.module.css"

const DevicesListComponent = () => {
	const devicesConfig = useQuery({
		queryKey: ["devices"],
		queryFn: deviceService.getDevicesConfig,
	})

	const devices = devicesConfig.data || []

	return (
		<>
			<div className={style.itemList}>
				{devices.length > 0 &&
					devices
						.sort((a: Device, b: Device) => a.order - b.order)
						.map((device: Device) => {
							return <DeviceComponent key={device.id} {...device} />
						})}
			</div>
		</>
	)
}

export default DevicesListComponent
