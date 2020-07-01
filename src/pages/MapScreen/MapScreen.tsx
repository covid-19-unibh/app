import React, { useEffect, useState, useCallback, useMemo } from 'react'
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
import { geolocated, GeolocatedProps } from 'react-geolocated'
import { buildLocation } from '../../utils/functions'

const style = {
  width: '100%',
  height: 'calc(100vh - 56px)',
}

const libraries = ['visualization', 'directions']

const buildHeatmapData = (cases: Case[]) =>
  cases.map((c) => ({
    // @ts-ignore
    location: new google.maps.LatLng(c.location.lat, c.location.lng),
    weight: c.serious + c.nonSerious + c.deaths,
  }))

type HeatmapLayerOptions = google.maps.visualization.HeatmapLayerOptions
type HeatmapOptions = Omit<HeatmapLayerOptions, 'data'>
type HeatmapItem = google.maps.visualization.WeightedLocation
type DirectionsService = google.maps.DirectionsService
type DirectionsRenderer = google.maps.DirectionsRenderer
type Map = google.maps.Map

const MapScreen: React.FC<GeolocatedProps> = ({ coords }) => {
  const [directionsService, createDirectionsService] = useState<DirectionsService>()
  const [directionsRenderer, createDirectionsRenderer] = useState<DirectionsRenderer>()
  const [stores, updateStores] = useState<Store[]>([])
  const [activeStores, updateActiveStores] = useState({})
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
      updateActiveStores(
        stores.reduce(
          (obj, store) => ({
            ...obj,
            [store.id]: false
          }), {}
        )
      )
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

  const mapCenter = useMemo(() => (
    buildLocation(-19.9659916, -43.9722723)
  ), [])

  const handleLoadMapsScript = useCallback(() => {
    createDirectionsService(new google.maps.DirectionsService())
    createDirectionsRenderer(new google.maps.DirectionsRenderer())
  }, [])

  const handleLoadMap = useCallback((map: Map) => {
    directionsRenderer?.setMap(map)
  }, [directionsRenderer])

  const handleHospitalClick = useCallback((hospital) => {
    const currUserLocation = buildLocation(
      (coords as any).latitude,
      (coords as any).longitude
    )

    const request = {
      origin: new google.maps.LatLng(currUserLocation.lat, currUserLocation.lng),
      destination: new google.maps.LatLng(hospital.location.lat, hospital.location.lng),
      travelMode: google.maps.TravelMode.DRIVING
    }

    directionsService?.route(request, (route) => {
      directionsRenderer?.setDirections(route)
    })
  }, [directionsService, directionsRenderer, coords])

  const toggleStoreActivation = useCallback((store: Store) => {
    const isActive = (activeStores as any)[store.id] // @todo: remove `any`
    updateActiveStores({ ...activeStores, [store.id]: !isActive })
  }, [activeStores])

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_API_KEY}
      libraries={libraries}
      onLoad={handleLoadMapsScript}
    >
      <GoogleMap
        mapContainerStyle={style}
        center={mapCenter}
        zoom={15}
        onLoad={handleLoadMap}
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
              onClick={() => toggleStoreActivation(store)}
            >
              {(activeStores as any)[store.id] &&
                <InfoWindow>
                  <StoreInfoWindow store={store} />
                </InfoWindow>
              }
            </Marker>
          ))}

        {/* Render places doing exams. */}
        {hospitals &&
          hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              icon="https://res.cloudinary.com/stanleysathler/covid-unibh/hospital.png"
              position={hospital.location}
              onClick={() => handleHospitalClick(hospital)}
            />
          ))}

        {/* Render current user. */}
        {coords &&
          <Marker
            icon="https://i.ibb.co/6PGHTBr/user-circle.png"
            position={buildLocation(coords.latitude, coords.longitude)}
          />
        }

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

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  watchPosition: true
})(MapScreen)