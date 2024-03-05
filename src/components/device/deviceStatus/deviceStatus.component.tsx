import { styled } from "styled-components"
import { Relay } from "../../../model/device.model"
import styles from "./deviceStatus.module.css"

const StatusLED = styled.span<{ $ison: boolean }>`
	margin: 0 auto;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	font-size: 1.2rem;
	font-weight: bold;
	color: black;
	background-color: ${(props) => (props.$ison ? "#abff00" : "#dee0db")};
	box-shadow: rgba(0, 0, 0, 0.145) 0 -0.75px 5px 0.75px,
		inset ${(props) => (props.$ison ? "#304701" : "#4a0000")} 0 -0.75px 7px,
		${(props) => (props.$ison ? "#89ff00" : "#a5a8a1")} 0 1.5px 9px;
`

const ErrorLed = styled.span`
	margin: 0 auto;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	font-size: 1.2rem;
	font-weight: bold;
	color: black;
	background-color: #ff0000;
	box-shadow: rgba(0, 0, 0, 0.145) 0 -0.75px 5px 0.75px, inset #4a0000 0 -0.75px 7px, #ff0000 0 1.5px 9px;
`

const DeviceStatusComponent = ({ relays }: { relays: Relay[] | undefined }) => {
	const displayRelayNumber = (index: number) => {
		if (relays && relays.length > 0) {
			return index + 1
		}
		return ""
	}

	const haveRelays = relays && relays.length > 0

	return (
		<div className={styles.status_container}>
			{!haveRelays && (
				<span className={styles.LED__container}>
					<ErrorLed data-testid="error-led">E</ErrorLed>
				</span>
			)}
			{haveRelays &&
				relays?.map((relay, index) => {
					return (
						<span key={index} className={styles.LED__container}>
							<StatusLED data-testid={`status-led-${index}`} $ison={relay.ison}>
								{displayRelayNumber(index)}
							</StatusLED>
						</span>
					)
				})}
		</div>
	)
}

export default DeviceStatusComponent
