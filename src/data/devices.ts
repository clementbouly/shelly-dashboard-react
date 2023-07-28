import { Device } from "../model/device.model"

export const DEVICES: Device[] = [
	{
		id: 10,
		name: "VMC F1",
		icon: "./assets/two-windmills.svg",
		order: 1,
		hasStatus: true,
	},
	{
		id: 11,
		name: "VMC F1 SS",
		icon: "./assets/windmill.svg",
		order: 2,
		hasStatus: true,
	},
	{
		id: 18,
		name: "Portail Spring 1",
		icon: "./assets/garage.svg",
		order: 3,
		hasStatus: true,
	},
	{
		id: 20,
		name: "Portail Spring 2",
		icon: "./assets/garage-2.svg",
		order: 4,
		hasStatus: true,
	},
	{
		id: 14,
		name: "Portail Moto",
		icon: "./assets/bike.svg",
		order: 5,
		hasStatus: true,
	},
	{
		id: 19,
		name: "Chargeur Spring",
		icon: "./assets/electricity-cable-svgrepo-com.svg",
		order: 6,
		hasStatus: true,
	},
	{
		id: 15,
		name: "Piscine",
		icon: "./assets/water-ladder.svg",
		order: 7,
		hasStatus: true,
	},
]
