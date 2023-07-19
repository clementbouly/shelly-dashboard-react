import { Device } from "../../model/device.model"
import styles from "./device.module.css"

interface DeviceComponentProps extends Device {
	updateStatus: (id: number) => void
}

const DeviceComponent = ({ updateStatus, ...props }: DeviceComponentProps) => {

	const getStatusColor = () => {
		if (props.status) {
			return styles.statusLED__on
		}
		return styles.statusLED__off
		
	}

	return (
		<span
			className={styles.card}
			onClick={() => {
				updateStatus(props.id)
			}}
		>
			<h2>{props.name}</h2>
			<img src={props.icon} alt={props.name} />
			<span className={styles.LED__container}>
				<span className={`${styles.statusLED} ${getStatusColor() ?? ""}`}></span>
			</span>
		</span>
	)
}

export default DeviceComponent
