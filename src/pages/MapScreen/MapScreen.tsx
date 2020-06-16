import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker, HeatmapLayer } from '@react-google-maps/api';
import * as api from '../../utils/api'

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
  const [stores, updateStores] = useState([])
  const [sickUsers, updateUsers] = useState([])
  const [cases, updateCases] = useState<api.Case[]>([])
  const [heatmap, updateHeatmap] = useState<google.maps.visualization.HeatmapLayerOptions>()

  useEffect(() => {
    api.get('/stores').then(data => {
      updateStores((data as unknown as {data: []}).data)
    })
  }, [])

  useEffect(() => {
    api.get('/sickUsers').then(data => {
      updateUsers((data as unknown as {data: []}).data)
    })
  }, [])

  useEffect(() => {
    api.get('/cases').then(data => {
      const cases = (data as unknown as { data: api.Case[] }).data
      updateCases(cases)
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
        <HeatmapLayer
          options={heatmap}
          data={[]}
        />

        {/* Render stores. */}
        {stores && stores.map((store: api.Store) => (
          <Marker key={store.id} position={store.location} />
        ))}

        {/* Render users. */}
        {sickUsers && sickUsers.map((user: api.User) => (
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