import { Device } from "../../model/device.model"
import styles from "./device.module.css"
import DeviceStatusComponent from "./deviceStatus/deviceStatus.component"

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
			<img src={props.icon} alt={props.name} />
			{props.hasStatus && <DeviceStatusComponent {...props} />}
		</span>
	)
}

export default DeviceComponent
