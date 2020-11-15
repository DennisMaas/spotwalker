import React from 'react';
import michel from '../../images/michel.jpg';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import ApertureIcon from './exifIcons/ApertureIcon';
import { Container } from '@material-ui/core';
import FocalLengthIcon from './exifIcons/FocalLengthIcon';
import ShutterSpeedIcon from './exifIcons/ShutterSpeedIcon';
import IsoIcon from './exifIcons/IsoIcon';
import FlashIcon from './exifIcons/FlashIcon';
import YouTubeIcon from './exifIcons/YouTubeIcon';
import Typography from '@material-ui/core/Typography';
import ExtrasIcon from './exifIcons/ExtrasIcon';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function InDepthDetailView() {
  const classes = useStyles();
  return (
    <Container disableGutters={true}>
      <Grid
        container
        justify={'space-around'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Grid item xs={12}>
          <Image src={michel} alt="Michel" />
        </Grid>

        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <ApertureIcon />
            <Typography variant={'body1'}>f8</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <FocalLengthIcon />
            <Typography variant={'body1'}>20</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <ShutterSpeedIcon />
            <Typography variant={'body1'}>320</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <IsoIcon />
            <Typography variant={'body1'}>200</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <FlashIcon />
            <Typography variant={'body1'}>kein</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <YouTubeIcon />
            <Typography variant={'body1'}>ja</Typography>
          </Paper>
        </Grid>
        <Paper className={classes.paper}>
          <Grid item xs={1}>
            <ExtrasIcon />
          </Grid>
          <Grid item>
            <Typography variant={'body1'}>Stativ</Typography>
            <Typography variant={'body1'}>Stitching-Software</Typography>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}
