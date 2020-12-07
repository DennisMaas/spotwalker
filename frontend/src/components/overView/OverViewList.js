import React, { useContext } from 'react';
import PlaceCard from '../cards/PlaceCard';
import { Grid } from '@material-ui/core';
import PlacesContext from '../../contexts/PlacesContext';

export default function OverViewList() {
  const { places } = useContext(PlacesContext);
  return (
    <>
      {places?.map((place) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={place.id}>
          <PlaceCard place={place} />
        </Grid>
      ))}
    </>
  );
}
