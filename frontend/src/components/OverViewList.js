import React, { useContext } from 'react';
import PlaceCard from './cards/PlaceCard';
import { Container, Grid } from '@material-ui/core';
import TopBar from './commons/TopBar';
import PlacesContext from '../contexts/PlacesContext';
import BottomBar from './commons/BottomBar';

export default function OverViewList() {
  const { places } = useContext(PlacesContext);
  return (
    <Container component={'main'} disableGutters={false}>
      <Grid container spacing={2} direction={'row'} justify={'flex-start'}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        {places?.map((place) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={place.id}>
            <PlaceCard place={place} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <BottomBar />
      </Grid>
    </Container>
  );
}
