import { buildLocation } from '../utils/functions'

export type Store = {
  id: number
  name: string
  location: { lat: number; lng: number }
}

export type DataReceiveCallback = (data: Store[]) => void

const products = [
  { name: 'Máscara', qnty: 10 },
  { name: 'Álcool em gel', qnty: 2 },
]

const stores = [
  {
    id: 1,
    name: 'Drogaria Araújo',
    location: buildLocation(-19.963002, -43.964006),
    products,
  },
  {
    id: 2,
    name: 'Droga Raia',
    location: buildLocation(-19.959649, -43.965991),
    products,
  },
]

export const listen = (onDataReceive: DataReceiveCallback) => {
  // Should call `onDataReceive()` whenever new data is retrieved.
  setTimeout(() => {
    onDataReceive(stores)
  }, 1000)
}
