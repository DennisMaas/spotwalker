import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
  ComboboxList,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import IconButton from '@material-ui/core/IconButton';

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
  const [selected, setSelected] = useState(null);
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

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if (loadError) return 'Fehler beim Laden der Karte';
  if (!isLoaded) return 'Karte wird geladen';
  return (
    <Grid item xs={12}>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
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
            <div>
              <Typography variant={'body1'}>
                {selected.lat}, {selected.lng}
              </Typography>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </Grid>
  );

  function Locate({ panTo }) {
    return (
      <IconButton
        size={'large'}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
        aria-label={'compass'}
      >
        <ExploreOutlinedIcon />
      </IconButton>
    );
  }
}
