import { styled } from "styled-components"
import { Device } from "../../../model/device.model"
import styles from "./deviceStatus.module.css"

const StatusLED = styled.span<{ $ison: boolean }>`
	margin: 0 auto;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	font-size: 1.2rem;
	font-weight: bold;
	color: black;
	background-color: ${(props) => (props.$ison ? "#abff00" : "#ff0000")};
	box-shadow: rgba(0, 0, 0, 0.2) 0 -0.75px 5px 0.75px,
		inset ${(props) => (props.$ison ? "#304701" : "#4a0000")} 0 -0.75px 7px,
		${(props) => (props.$ison ? "#89ff00" : "#ff0000")} 0 1.5px 9px;
`
const DeviceStatusComponent = (props: Device) => {
	const displayRelayNumber = (index: number) => {
		if (props.relays && props.relays.length > 1) {
			return index + 1
		}
		return ""
	}

	return (
		<div className={styles.status_container}>
			{props.relays?.map((relay, index) => {
				return (
					<span key={index} className={styles.LED__container}>
						<StatusLED $ison={relay.ison}>{displayRelayNumber(index)}</StatusLED>
					</span>
				)
			})}
		</div>
	)
}

export default DeviceStatusComponent
