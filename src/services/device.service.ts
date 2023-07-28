import { Device, DeviceStatus, Relay } from "../model/device.model"

const getRelaysStatus = async (id: number): Promise<Relay[]> => {
	const data = await fetch(`http://192.168.11.${id}/status`)
	const deviceStatus: DeviceStatus = await data.json()

	return deviceStatus.relays
}

const getDevicesConfig = async (): Promise<Device[]> => {
	const data = await fetch("/config.json")
	return await data.json()
}

export const deviceService = {
	getRelaysStatus,
	getDevicesConfig,
}
