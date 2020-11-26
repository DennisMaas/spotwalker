import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import HideOnScroll from '../HideOnScroll';

const useStyles = makeStyles({
  title: { flexGrow: 1 },
});

export default function TopBar({ title }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <HideOnScroll>
        <AppBar position={'fixed'}>
          <Toolbar>
            {title && (
              <IconButton
                edge={'start'}
                color={'inherit'}
                aria-label={'go back'}
                onClick={onBack}
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
  function onBack() {
    history.goBack();
  }
}
