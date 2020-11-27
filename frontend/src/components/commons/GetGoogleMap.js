import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Grid from '@material-ui/core/Grid';

const libraries = ['places'];

const mapContainerStyle = {
  width: '400px',
  height: '600px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 53.55009,
  lng: 9.991636,
};

export default function GetGoogleMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  if (loadError) return 'Fehler beim Laden der Karte';
  if (!isLoaded) return 'Karte wird geladen';
  return (
    <Grid item xs={12}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </Grid>
  );
}
