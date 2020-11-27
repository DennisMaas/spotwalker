import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Typography } from '@material-ui/core';
import '@reach/combobox/styles.css';
import SearchGoogleMaps from './SearchGoogleMaps';
import LocateMapsUser from './LocateMapsUser';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '60vh',
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
    <>
      <SearchGoogleMaps className={'search'} panTo={panTo} />
      <LocateMapsUser panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
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
              <Typography variant={'body2'}>
                {selected.lat}, {selected.lng}
              </Typography>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}
