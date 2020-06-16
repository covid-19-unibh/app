import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker, HeatmapLayer } from '@react-google-maps/api';
import * as api from '../../utils/api'
import { listen as listenToStores, Store } from '../../models/stores'
import { listen as listenToUsers, User } from '../../models/users'

const style = {
  width: '100%',
  height: '100vh'
}

const mapCenter = {
  lat: -19.959221,
  lng: -43.966513,
}

const libraries = ['visualization']

const buildHeatmapData = (cases: api.Case[]) => (
  cases.map(c => ({
    // @ts-ignore
    location: new google.maps.LatLng(c.location.lat, c.location.lng),
    weight: (c.serious + c.nonSerious + c.deaths)
  }))
)

export default function MapScreen() {
  const [stores, updateStores] = useState<Store[]>([])
  const [hospitals, updateHospitals] = useState<api.Hospital[]>([])
  const [sickUsers, updateUsers] = useState<User[]>([])
  const [cases, updateCases] = useState<api.Case[]>([])
  const [heatmap, updateHeatmap] = useState<google.maps.visualization.HeatmapLayerOptions>()

  useEffect(() => {
    listenToStores(stores => {
      updateStores(stores)
    })
  }, [])

  useEffect(() => {
    listenToUsers(users => {
      updateUsers(users)
    })
  }, [])

  useEffect(() => {
    api.get('/cases').then(data => {
      const cases = (data as unknown as { data: api.Case[] }).data
      updateCases(cases)
    })
  }, [])

  useEffect(() => {
    api.get('/hospitals').then(data => {
      const hospitals = (data as unknown as { data: api.Hospital[] }).data
      updateHospitals(hospitals)
    })
  }, [])

  const handleMapsScriptLoaded = useCallback(() => {
    updateHeatmap({
      radius: 200,
      data: buildHeatmapData(cases),
      opacity: 0.25
    })
  }, [cases])

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_API_KEY}
      libraries={libraries}
      onLoad={handleMapsScriptLoaded}
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
          options={heatmap}
          data={[]}
        />

        {/* Render stores. */}
        {stores && stores.map((store: Store) => (
          <Marker
            key={store.id}
            icon="https://res.cloudinary.com/stanleysathler/covid-unibh/shop.png"
            position={store.location}
          />
        ))}

        {/* Render places doing exams. */}
        {hospitals && hospitals.map((hospital: api.Hospital) => (
          <Marker
            key={hospital.id}
            icon="https://res.cloudinary.com/stanleysathler/covid-unibh/hospital.png"
            position={hospital.location}
          />
        ))}

        {/* Render users. */}
        {sickUsers && sickUsers.map((user: User) => (
          <Marker
            key={user.id}
            icon="https://i.ibb.co/Ln8d1Nf/infected-circle.png"
            position={user.location}
          />
        ))}
      </GoogleMap>
    </LoadScript>
    );
};