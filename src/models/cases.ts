import { buildLocation } from '../utils/functions'

export type Case = {
  id: number
  neighborhood: string
  location: { lat: number; lng: number }
  serious: number
  nonSerious: number
  deaths: number
}

export type DataReceiveCallback = (data: Case[]) => void

const mockedCases = [
  {
    id: 1,
    neighborhood: 'Estoril',
    location: buildLocation(-19.961755, -43.961543),
    serious: 5,
    nonSerious: 7,
    deaths: 0,
  },
  {
    id: 2,
    neighborhood: 'Buritis',
    location: buildLocation(-19.975713, -43.968317),
    serious: 12,
    nonSerious: 10,
    deaths: 2,
  },
]

export const fetch = (onDataReceive: DataReceiveCallback) => {
  setTimeout(() => {
    onDataReceive(mockedCases)
  }, 1000)
}
