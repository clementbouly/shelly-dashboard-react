import { Device, PilotedType } from "../../model/device.model"
import { API_URL } from "../../services/device.service"
import styles from "./device.module.css"
import DeviceActionsComponent from "./deviceActions/deviceActions.component"
import DeviceStatusComponent from "./deviceStatus/deviceStatus.component"
import { ReactComponent as SettingIcon } from "/src/assets/setting-svgrepo-com.svg"

interface DeviceComponentProps extends Device {
	updateStatus: (id: number, relayIndex: number, relayStatus: boolean) => void
}

const DeviceComponent = ({ updateStatus, ...props }: DeviceComponentProps) => {
	return (
		<span className={styles.card}>
			<h2>{props.name}</h2>
			<DeviceActionsComponent updateStatus={updateStatus} {...props} />
			{props.pilotedType !== PilotedType.NONE && (
				<a href={`${API_URL}.${props.id}`}>
					<SettingIcon className={styles.icon__setting} />
				</a>
			)}

			{props.hasStatus && <DeviceStatusComponent {...props} />}
		</span>
	)
}

export default DeviceComponent
