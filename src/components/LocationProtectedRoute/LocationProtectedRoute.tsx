import React from 'react'
import { RouteProps, Redirect, Route } from "react-router-dom"
import { geolocated, GeolocatedProps } from 'react-geolocated'

const LocationProtectedRoute: React.FC<RouteProps & GeolocatedProps> = ({ children, isGeolocationEnabled, ...props }) => {
  const renderer = () => isGeolocationEnabled
    ? children
    : <Redirect to={{ pathname: '/location-required' }} />

  return (
    <Route
      {...props}
      render={renderer}
    />
  )
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
})(LocationProtectedRoute)