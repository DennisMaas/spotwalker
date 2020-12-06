import React, { useCallback, useContext, useRef, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import TopBar from './commons/TopBar';
import PlacesContext from '../contexts/PlacesContext';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import BottomBar from './commons/BottomBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
  const [selected, setSelected] = useState();
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
                key={`${place.id}-${place.title}`}
                position={{ lat: place.lat, lng: place.lng }}
                icon={{
                  url: iconUrl,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setSelected(place);
                }}
              />
            ))}
            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <Box justify={'center'} component={'div'}>
                  <Typography variant={'h6'} component={'h2'}>
                    {selected.title}
                  </Typography>
                  <img
                    style={{
                      width: '30vw',
                      height: 'auto',
                    }}
                    alt={selected.title}
                    src={selected.primaryPictureUrl}
                  />
                </Box>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BottomBar />
      </Grid>
    </Container>
  );
}
