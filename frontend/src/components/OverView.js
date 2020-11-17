import React from 'react';
import PlaceCard from './cards/PlaceCard';
import { Container, Grid } from '@material-ui/core';

export default function OverView() {
  return (
    <Container disableGutters={false}>
      <Grid container spacing={2} direction={'row'} justify={'flex-start'}>
        {placeDb.map((placeData) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PlaceCard
              key={placeData.id}
              type={placeData.type}
              title={placeData.title}
              street={placeData.street}
              primaryPictureUrl={placeData.primaryPictureUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
