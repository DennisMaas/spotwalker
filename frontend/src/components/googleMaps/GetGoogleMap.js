import React, { useCallback, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import LocateMapsUser from './LocateMapsUser';
import SearchGoogleMaps from './SearchGoogleMaps';

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
  lat: 53.55008,
  lng: 9.991636,
};

export default function GetGoogleMap({ lat, lng, setMarker }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = useCallback(
    (event) => {
      setMarker(event.latLng.lat(), event.latLng.lng());
    },
    [setMarker]
  );

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  if (loadError) return 'Fehler beim Laden der Karte';
  if (!isLoaded) return 'Karte wird geladen';

  return (
    <>
      <SearchGoogleMaps panTo={panTo} />
      <LocateMapsUser panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker
          clickable={false}
          draggable={false}
          key={`${lat}-${lng}`}
          position={{ lat: lat, lng: lng }}
        />
      </GoogleMap>
    </>
  );
}
