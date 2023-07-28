import { Device } from "../../../model/device.model"
import styles from "./deviceStatus.module.css"

const DeviceStatusComponent = (props: Device) => {
	return (
		<div className={styles.status_container}>
			{props.relays?.map((relay, index) => {
				return (
					<span key={index} className={styles.LED__container}>
						<span
							className={`
						${styles.statusLED} 
						${relay.ison ? styles.statusLED__on : styles.statusLED__off}`}
						>
							{index + 1}
						</span>
					</span>
				)
			})}
		</div>
	)
}

export default DeviceStatusComponent
