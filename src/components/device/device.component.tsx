import { Device } from "../../model/device.model"
import styles from "./device.module.css"

const DeviceComponent = (props: Device) => {
	return (
		<span className={styles.card}>
			<h2>{props.name}</h2>
			<img src={props.icon} alt={props.name} />
		</span>
	)
}

export default DeviceComponent
