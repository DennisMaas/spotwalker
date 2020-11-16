import React from 'react';
import michel from '../../images/michel.jpg';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import ApertureIcon from './exifIcons/ApertureIcon';
import {Container} from '@material-ui/core';
import FocalLengthIcon from './exifIcons/FocalLengthIcon';
import ShutterSpeedIcon from './exifIcons/ShutterSpeedIcon';
import IsoIcon from './exifIcons/IsoIcon';
import FlashIcon from './exifIcons/FlashIcon';
import YouTubeIcon from './exifIcons/YouTubeIcon';
import Typography from '@material-ui/core/Typography';
import ExtrasIcon from './exifIcons/ExtrasIcon';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  toprow: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    outline: 0,
    align: 'center'
  },

  bottomrow:{
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  outline: 0,
  align: 'center'
},

  description:{
    padding: theme.spacing(3),

    textAlign: 'left',
  color: theme.palette.text.primary,

},
}));

export default function InDepthDetailView() {
  const classes = useStyles();
  return (
      <Container disableGutters={true}>

      <Grid
        container
        justify={'space-evenly'}
        alignItems={'center'}
        alignContent={'center'}
      >

        <Grid item xs={12}>
          <Image src={michel} alt="Michel" />
        </Grid>


        <Grid item xs={2}>
          <div className={classes.toprow}>
            <ApertureIcon />
            <Typography variant={'body2'}>f8</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <FocalLengthIcon />
            <Typography variant={'body2'}>20</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <ShutterSpeedIcon />
            <Typography variant={'body2'}>320</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <IsoIcon />
            <Typography variant={'body2'}>200</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <FlashIcon />
            <Typography variant={'body2'}>kein</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <YouTubeIcon />
            <Typography variant={'body2'}>ja</Typography>
          </div>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={2}>
            <div className={classes.toprow}>
            <ExtrasIcon />
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className={classes.bottomrow} >
            <Typography variant={'body2'}>Stativ</Typography>
            <Typography variant={'body2'}>Stitching-Software</Typography>
          </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.description}>
          <Typography variant={'body2'}>
            Bei diesem Bild heißt es Ausschau halten und in die Knie gehen. Der Durchgang vom Thielickestieg bietet einen natürlich Rahmen für den Michel. Geschossen wurden 9 Einzelaufnahmen, die danach zu einem Panorama zusammengesetzt worden sind. Zum einen vergrößert das den Blickwinkel, zum anderen natürlich die Pixelzahl und damit die maximal mögliche Druckgröße.
          </Typography>
        </Grid>


      </Grid>
    </Container>
  );
}
