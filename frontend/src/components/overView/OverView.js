import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import TopBar from '../commons/TopBar';
import BottomBar from '../commons/BottomBar';
import OverViewList from './OverViewList';
import OverViewMaps from './OverViewMaps';

export default function OverView() {
  const [bottomBarAction, setBottomBarAction] = useState('list');

  return (
    <Container component={'main'} disableGutters={false}>
      <Grid container spacing={2} direction={'row'} justify={'flex-start'}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        {bottomBarAction === 'list' && <OverViewList />}
        {bottomBarAction === 'map' && <OverViewMaps />}
      </Grid>
      <Grid item xs={12}>
        <BottomBar
          bottomBarAction={bottomBarAction}
          setBottomBarAction={setBottomBarAction}
        />
      </Grid>
    </Container>
  );
}
