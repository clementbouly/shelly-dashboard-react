import { Device, DeviceStatus, Relay, RelayActionType } from "../model/device.model"

export const API_URL = "http://192.168.11"

const getRelaysStatus = async (id: number): Promise<Relay[]> => {
	try {
		const data = await fetch(`${API_URL}.${id}/status`)
		const deviceStatus: DeviceStatus = await data.json()
		return deviceStatus.relays
	} catch (error: any) {
		console.error("Error fetching device id : ", id, error)
		return []
	}
}

const getDevicesConfig = async (): Promise<Device[]> => {
	try {
		const data = await fetch("/config.json")
		return await data.json()
	} catch (error) {
		console.error(error)
		return []
	}
}
/**
 * @param id device id
 * @param relayIndex relay index
 * @param status relay status
 * @returns
 * @description toggle relay status
 * @example
 * toggleRelay(1, 0, "on")
 * toggleRelay(1, 0, "off")
 */
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
