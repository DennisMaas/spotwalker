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
} from '@reach/combobox';
import '@reach/combobox/styles.css';

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

  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 53.55009, lng: () => 9.991636 },
        radius: 200 * 1000,
      },
    });
    return (
      <div className={'search'}>
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (error) {
              console.log('error!');
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            disabled={!ready}
            placeholder={'Suche einen Ort'}
          />
          <ComboboxPopover>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }
}
