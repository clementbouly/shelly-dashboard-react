import { Device } from "../../model/device.model"
import { API_URL } from "../../services/device.service"
import styles from "./device.module.css"
import DeviceStatusComponent from "./deviceStatus/deviceStatus.component"
import { ReactComponent as SettingIcon } from "/src/assets/setting-svgrepo-com.svg"

interface DeviceComponentProps extends Device {
	updateStatus: (id: number) => void
}

const DeviceComponent = ({ updateStatus, ...props }: DeviceComponentProps) => {
	return (
		<span
			className={styles.card}
			onClick={() => {
				updateStatus(props.id)
			}}
		>
			<h2>{props.name}</h2>
			<img className={styles.icon__action} src={props.icon} alt={props.name} />
			<a href={`${API_URL}.${props.id}`}>
				{/* <img className={styles.icon__setting} src={SettingIcon} alt="Settings" /> */}
				<SettingIcon className={styles.icon__setting} />
			</a>

			{props.hasStatus && <DeviceStatusComponent {...props} />}
		</span>
	)
}

export default DeviceComponent
