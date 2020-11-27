import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Grid from '@material-ui/core/Grid';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = { lat: 53.55009, lng: 9.991636 };

export default function GetGoogleMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return 'Fehler beim Laden der Karte';
  if (!isLoaded) return 'Karte wird geladen';
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={center}
          >
            map
          </GoogleMap>
        </Grid>
      </Grid>
    </div>
  );
}
