import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import * as api from '../../utils/api'

const style = {
  width: '100%',
  height: 'calc(100vh - 16px)'
}

const mapCenter = {
  lat: -19.959221,
  lng: -43.966513,
}

export default function MapScreen() {
  const [stores, updateStores] = useState([])
  const [sickUsers, updateUsers] = useState([])

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

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={style}
        center={mapCenter}
        zoom={15}
        options={{
          disableDefaultUI: true,
        }}
      >
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