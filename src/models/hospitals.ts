import { buildLocation } from '../utils/functions'
import fire from './firebase'

export type Hospital = {
  id: number
  name: string
  location: { lat: number; lng: number }
}

export type DataReceiveCallback = (data: Hospital[]) => void

const adaptData = (docSnapshots: any[]) =>
  docSnapshots.map(docSnapshot => {
    const serialized = docSnapshot.data()
    return {
      id: docSnapshot.id,
      name: serialized.name,
      location: buildLocation(
        serialized.location.latitude,
        serialized.location.longitude
      )
    }
  })

export const fetch = (onDataReceive: DataReceiveCallback) => {
  fire
    .firestore()
    .collection('hospitals')
    .onSnapshot(qs => {
      onDataReceive(adaptData(qs.docs))
    })
}
