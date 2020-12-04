import React, { useCallback, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import LocateMapsUser from './LocateMapsUser';
import SearchGoogleMaps from './SearchGoogleMaps';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  map: {
    position: 'relative',
  },
  search: {
    maxWidth: '300px',
    bottom: '4%',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'absolute',
    zIndex: 10,
  },
  locate: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
  },
}));

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '60vh',
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

export default function GetGoogleMap({ lat, lng, setMarker }) {
  const classes = useStyles();
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
    <Grid container item className={classes.map}>
      <Grid xs={7} item className={classes.search}>
        <SearchGoogleMaps panTo={panTo} />
      </Grid>
      <Grid item xs={2} className={classes.locate}>
        <LocateMapsUser panTo={panTo} />
      </Grid>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
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
          icon={{
            url: iconUrl,
          }}
        />
      </GoogleMap>
    </Grid>
  );
}
