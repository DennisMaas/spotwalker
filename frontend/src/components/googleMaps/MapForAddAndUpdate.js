import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MapBase from './MapBase';
import { Marker } from '@react-google-maps/api';

const useStyles = makeStyles((theme) => ({
  map: {
    position: 'relative',
  },
}));

const key = process.env['REACT_APP_MAPS_MARKER_API_KEY'];
const iconUrl = `https://api.geoapify.com/v1/icon/?type=material&color=%23ea4435&size=small&icon=add_a_photo&textSize=small&strokeColor=%23811411&noShadow&noWhiteCircle&apiKey=${key}`;

export default function MapForAddAndUpdate({ lat, lng, setMarker }) {
  const classes = useStyles();

  const onMapClick = useCallback(
    (event) => {
      setMarker(event.latLng.lat(), event.latLng.lng());
    },
    [setMarker]
  );
  return (
    <Grid container item className={classes.map}>
      <MapBase
        onMapClick={onMapClick}
        lat={lat}
        lng={lng}
        setMarker={setMarker}
        iconUrl={iconUrl}
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
      </MapBase>
    </Grid>
  );
}
