export interface Relay {
	ison: boolean
}

export interface DeviceStatus {
	relays: Relay[]
}

export enum PilotedType {
	NONE = "NONE",
	SIMPLE = "SIMPLE",
	DOUBLE = "DOUBLE",
}

export enum RelayActionType {
	ON = "on",
	OFF = "off",
}

export interface Device {
	id: number
	name: string
	icon: string
	order: number
	hasStatus: boolean
	pilotedType?: PilotedType
	relays?: Relay[]
}
