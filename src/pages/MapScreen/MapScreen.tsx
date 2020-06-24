import React, { useEffect, useState } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  HeatmapLayer,
  InfoWindow,
} from '@react-google-maps/api'
import { listen as listenToStores, Store } from '../../models/stores'
import { listen as listenToUsers, User } from '../../models/users'
import { fetch as fetchCases, Case } from '../../models/cases'
import { fetch as fetchHospitals, Hospital } from '../../models/hospitals'
import StoreInfoWindow from '../../components/StoreInfoWindow/StoreInfoWindow'

const style = {
  width: '100%',
  height: 'calc(100vh - 56px)',
}

const mapCenter = {
  lat: -19.959221,
  lng: -43.966513,
}

const libraries = ['visualization']

const buildHeatmapData = (cases: Case[]) =>
  cases.map((c) => ({
    // @ts-ignore
    location: new google.maps.LatLng(c.location.lat, c.location.lng),
    weight: c.serious + c.nonSerious + c.deaths,
  }))

type HeatmapLayerOptions = google.maps.visualization.HeatmapLayerOptions
type HeatmapOptions = Omit<HeatmapLayerOptions, 'data'>
type HeatmapItem = google.maps.visualization.WeightedLocation

export default function MapScreen() {
  const [stores, updateStores] = useState<Store[]>([])
  const [hospitals, updateHospitals] = useState<Hospital[]>([])
  const [sickUsers, updateUsers] = useState<User[]>([])
  const [cases, updateCases] = useState<Case[]>([])
  const [heatOptions] = useState<HeatmapOptions>({
    radius: 200,
    opacity: 0.25,
  })
  const [heatData, updateHeatData] = useState<HeatmapItem[]>([])

  useEffect(() => {
    listenToStores((stores) => {
      updateStores(stores)
    })
  }, [])

  useEffect(() => {
    listenToUsers((users) => {
      updateUsers(users)
    })
  }, [])

  useEffect(() => {
    fetchCases((cases) => {
      updateCases(cases)
    })
  }, [])

  useEffect(() => {
    fetchHospitals((hospitals) => {
      updateHospitals(hospitals)
    })
  }, [])

  useEffect(() => {
    if (typeof window.google !== 'undefined')
      updateHeatData(buildHeatmapData(cases))
  }, [cases])

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={style}
        center={mapCenter}
        zoom={15}
        options={{
          disableDefaultUI: true,
        }}
      >
        {/* Confirmed cases heatmap. */}
        <HeatmapLayer
          options={heatOptions as HeatmapLayerOptions}
          data={heatData}
        />

        {/* Render stores. */}
        {stores &&
          stores.map((store) => (
            <Marker
              key={store.id}
              icon="https://res.cloudinary.com/stanleysathler/covid-unibh/shop.png"
              position={store.location}
            >
              <InfoWindow>
                <StoreInfoWindow store={store} />
              </InfoWindow>
            </Marker>
          ))}

        {/* Render places doing exams. */}
        {hospitals &&
          hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              icon="https://res.cloudinary.com/stanleysathler/covid-unibh/hospital.png"
              position={hospital.location}
            />
          ))}

        {/* Render users. */}
        {sickUsers &&
          sickUsers.map((user) => (
            <Marker
              key={user.id}
              icon="https://i.ibb.co/Ln8d1Nf/infected-circle.png"
              position={user.location}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  )
}
