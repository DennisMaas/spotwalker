import React, { useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import LocateMapsUser from './LocateMapsUser';
import SearchGoogleMaps from './SearchGoogleMaps';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import mapStyles from './mapStyles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
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
  height: '79vh',
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  mapTypeControl: true,
  zoomControl: true,
};

const center = {
  lat: 53.55008,
  lng: 9.991636,
};

export default function MapBase({ children, setMarker }) {
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
    mapRef.current.setZoom(17);
  }, []);

  if (loadError) return 'Fehler beim Laden der Karte';
  if (!isLoaded) return 'Karte wird geladen';

  return (
    <Grid container item className={classes.map}>
      <Grid item className={classes.search}>
        <SearchGoogleMaps panTo={panTo} />
      </Grid>
      <div className={classes.grow} />
      <Grid item className={classes.locate}>
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
        {children}
      </GoogleMap>
    </Grid>
  );
}
