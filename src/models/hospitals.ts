import { buildLocation } from "../utils/functions"

export type Hospital = {
  id: number;
  name: string;
  location: { lat: number, lng: number };
}

export type DataReceiveCallback = (data: Hospital[]) => void

const mockedHospitals: Hospital[] = [
  { id: 1, name: 'Hermes Pardini', location: buildLocation(-19.960919, -43.969963) }
]

export const fetch = (onDataReceive: DataReceiveCallback) => {
  setTimeout(() => {
    onDataReceive(mockedHospitals)
  }, 1000)
}