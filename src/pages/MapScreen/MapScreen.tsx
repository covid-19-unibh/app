import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const style = {
  width: '100%',
  height: 'calc(100vh - 16px)'
}

const mapCenter = {
  lat: -19.9172987,
  lng: -43.9345593,
}

export default function MapScreen() {
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
      {/* Markers go here... */}
      </GoogleMap>
    </LoadScript>
    );
};