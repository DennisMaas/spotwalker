import React, { useContext, useState } from 'react';
import { Grid } from '@material-ui/core';
import PlacesContext from '../../contexts/PlacesContext';
import { InfoWindow, Marker } from '@react-google-maps/api';
import Box from '@material-ui/core/Box';
import MapBase from '../googleMaps/MapBase';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlaceCard from '../cards/PlaceCard';

const useStyles = makeStyles((theme) => ({
  map: {
    position: 'relative',
  },
}));

const key = process.env['REACT_APP_MAPS_MARKER_API_KEY'];
const iconUrl = `https://api.geoapify.com/v1/icon/?type=material&color=%23ea4435&size=small&icon=add_a_photo&textSize=small&strokeColor=%23811411&noShadow&noWhiteCircle&apiKey=${key}`;

export default function OverViewMap() {
  const classes = useStyles();
  const { places } = useContext(PlacesContext);
  const [selected, setSelected] = useState();

  return (
    <Grid container item className={classes.map}>
      <MapBase iconUrl={iconUrl}>
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
              <PlaceCard place={selected} />
            </Box>
          </InfoWindow>
        ) : null}
      </MapBase>
    </Grid>
  );
}
