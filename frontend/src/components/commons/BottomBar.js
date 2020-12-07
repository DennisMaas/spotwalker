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
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  bottomBarAction: {
    color: theme.palette.action,
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
              className={classes.bottomBarAction}
            >
              <ViewListIcon />
            </IconButton>
            <div className={classes.grow} />
            <IconButton
              edge={'end'}
              color={'inherit'}
              onClick={handleMapClick}
              className={classes.bottomBarAction}
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
              className={classes.bottomBarAction}
            >
              <ViewListOutlinedIcon />
            </IconButton>
            <div className={classes.grow} />
            <IconButton
              edge={'end'}
              color={'inherit'}
              onClick={handleMapClick}
              className={classes.bottomBarAction}
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
