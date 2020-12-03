import React, { useContext } from 'react';
import PlaceCard from './cards/PlaceCard';
import { Container, Grid } from '@material-ui/core';
import TopBar from './commons/TopBar';
import Paper from '@material-ui/core/Paper';
import PlacesContext from '../contexts/PlacesContext';

export default function OverViewList() {
  const { places } = useContext(PlacesContext);
  return (
    <Paper>
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
      </Container>
    </Paper>
  );
}
