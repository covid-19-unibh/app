import { mockedCases as cases } from '../mocked/cases'

export type Case = {
  id: number
  neighborhood: string
  location: { lat: number; lng: number }
  serious: number
  nonSerious: number
  deaths: number
}

export type DataReceiveCallback = (data: Case[]) => void

export const fetch = (onDataReceive: DataReceiveCallback) => {
  setTimeout(() => {
    onDataReceive(cases)
  }, 1000)
}
