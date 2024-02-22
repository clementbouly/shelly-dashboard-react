import { Device, DeviceStatus, Relay, RelayActionType } from "../model/device.model"

export const API_URL = "http://192.168.11"

const getRelaysStatus = async (id: number): Promise<Relay[]> => {
	try {
		const data = await fetch(`${API_URL}.${id}/status`)
		const deviceStatus: DeviceStatus = await data.json()
		return deviceStatus.relays
	} catch (error: any) {
		throw new Error(error)
	}
}

const getDevicesConfig = async (): Promise<Device[]> => {
	try {
		const data = await fetch("/config.json")
		return await data.json()
	} catch (error: any) {
		throw new Error(error)
	}
}

const toggleRelay = async (id: number, relayIndex: number, status: RelayActionType): Promise<Relay> => {
	try {
		const data = await fetch(`${API_URL}.${id}/relay/${relayIndex}?turn=${status}`)
		return await data.json()
	} catch (error) {
		console.error(error)
		return {} as Relay
	}
}

export const deviceService = {
	getRelaysStatus,
	getDevicesConfig,
	toggleRelay,
}
