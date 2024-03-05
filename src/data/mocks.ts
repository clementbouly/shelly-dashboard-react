import { Device, PilotedType } from "../model/device.model";

export const FAKE_DEVICE: Device = {
    id: 1,
    name: "Fake Device",
    pilotedType: PilotedType.NONE,
    hasStatus: true,
    icon: "icon",
    order: 1,
    relays: [
        {
            ison: true,
        },
        {
            ison: false,
        }
    ],
}

export const FAKE_DEVICES_STATUS_ON: Device = {
    id: 1,
    name: "Fake Device",
    pilotedType: PilotedType.NONE,
    hasStatus: true,
    icon: "icon",
    order: 1,
    relays: [
        {
            ison: true,
        },
        {
            ison: true,
        }
    ],
}

export const FAKE_DEVICES_STATUS_OFF: Device = {
    id: 1,
    name: "Fake Device",
    pilotedType: PilotedType.NONE,
    hasStatus: true,
    icon: "icon",
    order: 1,
    relays: [
        {
            ison: false,
        },
        {
            ison: false,
        }
    ],
}
