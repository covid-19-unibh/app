import { buildLocation } from "../utils/functions"

export type User = {
  id: number;
  location: { lat: number, lng: number };
}

export type DataReceiveCallback = (data: User[]) => void

const mockedUsers = [
  { id: 1, location: buildLocation(-19.9659916, -43.9722723), isSick: true },
  { id: 2, location: buildLocation(-19.975164, -43.968839), isSick: true },
]

export const listen = (onDataReceive: DataReceiveCallback) => {
  setTimeout(() => {
    onDataReceive(mockedUsers)
  }, 1000)
}