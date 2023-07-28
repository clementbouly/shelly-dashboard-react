export interface Relay {
	ison: boolean
}

export interface DeviceStatus {
	relays: Relay[]
}

export interface Device {
	id: number
	name: string
	icon: string
	order: number
	hasStatus: boolean
	relays?: Relay[]
}
