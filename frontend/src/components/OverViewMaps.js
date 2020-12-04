import React, { useCallback, useContext, useRef } from 'react';
import { Container, Grid } from '@material-ui/core';
import TopBar from './commons/TopBar';
import PlacesContext from '../contexts/PlacesContext';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import BottomBar from './commons/BottomBar';
import CssBaseline from '@material-ui/core/CssBaseline';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '84vh',
};

const options = {
  disableDefaultUI: true,
  mapTypeControl: true,
  zoomControl: true,
};

const center = {
  lat: 53.55008,
  lng: 9.991636,
};

const key = process.env['REACT_APP_MAPS_MARKER_API_KEY'];
const iconUrl = `https://api.geoapify.com/v1/icon/?type=material&color=%23ea4435&size=small&icon=add_a_photo&textSize=small&strokeColor=%23811411&noShadow&noWhiteCircle&apiKey=${key}`;

export default function OverViewMap() {
  const { places } = useContext(PlacesContext);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Fehler beim Laden der Karte';
  if (!isLoaded) return 'Karte wird geladen';

  return (
    <Container component={'main'} disableGutters={true}>
      <CssBaseline />
      <Grid container spacing={0} direction={'row'} justify={'flex-start'}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>

        <Grid item xs={12} id={'map-grid-item'}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            {places?.map((place) => (
              <Marker
                key={`${place.id}`}
                position={{ lat: place.lat, lng: place.lng }}
                icon={{
                  url: iconUrl,
                }}
              />
            ))}
          </GoogleMap>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BottomBar />
      </Grid>
    </Container>
  );
}
