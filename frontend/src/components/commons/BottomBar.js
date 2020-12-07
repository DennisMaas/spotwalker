import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function BottomBar({ bottomBarAction, setBottomBarAction }) {
  const classes = useStyles();

  return (
    <>
      <AppBar position={'fixed'} color={'primary'} className={classes.appBar}>
        {bottomBarAction === 'list' && (
          <Toolbar>
            <IconButton
              edge={'start'}
              color={'inherit'}
              onClick={handleListClick}
            >
              <ViewListIcon />
            </IconButton>
            <div className={classes.grow} />
            <IconButton
              edge={'end'}
              color={'inherit'}
              onClick={handleMapClick}
            >
              <MapOutlinedIcon />
            </IconButton>
          </Toolbar>
        )}
        {bottomBarAction === 'map' && (
          <Toolbar>
            <IconButton
              edge={'start'}
              color={'inherit'}
              onClick={handleListClick}
            >
              <ViewListOutlinedIcon />
            </IconButton>
            <div className={classes.grow} />
            <IconButton
              edge={'end'}
              color={'inherit'}
              onClick={handleMapClick}
            >
              <MapIcon />
            </IconButton>
          </Toolbar>
        )}
      </AppBar>
      <Toolbar />
    </>
  );
  function handleListClick() {
    setBottomBarAction('list');
  }
  function handleMapClick() {
    setBottomBarAction('map');
  }
}
