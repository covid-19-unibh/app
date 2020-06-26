import { buildLocation } from '../utils/functions'
import fire from './firebase'

export type ProductStore = {
  sku: number
  name: string
  qnty: number
}

export type Store = {
  id: number
  name: string
  location: { lat: number; lng: number }
  products: ProductStore[]
}

export type DataReceiveCallback = (data: Store[]) => void

const adaptData = (docSnapshots: any[]) =>
  docSnapshots.map(docSnapshot => {
    const serialized = docSnapshot.data()
    return {
      id: docSnapshot.id,
      name: serialized.name,
      location: buildLocation(
        serialized.location.latitude,
        serialized.location.longitude
      ),
      products: serialized.products
    }
  })

export const listen = (onDataReceive: DataReceiveCallback) => {
  fire
    .firestore()
    .collection('stores')
    .onSnapshot(qs => {
      onDataReceive(adaptData(qs.docs))
    })
}
