import { buildLocation } from '../utils/functions'
import fire from './firebase'

export type User = {
  id: number | string
  location: { lat: number; lng: number }
  isSick: boolean
}

export type DataReceiveCallback = (data: User[]) => void

const adaptData = (usersSnapshot: any[]) =>
  usersSnapshot.map(us => {
    const serialized = us.data()
    return {
      id: us.id,
      location: buildLocation(
        serialized.location.latitude,
        serialized.location.longitude
      ),
      isSick: serialized.isSick
    }
  })

export const listen = (onDataReceive: DataReceiveCallback) => {
  fire
    .firestore()
    .collection('users')
    .where('isSick', '==', true)
    .onSnapshot(qs => {
      onDataReceive(adaptData(qs.docs))
    })
}
