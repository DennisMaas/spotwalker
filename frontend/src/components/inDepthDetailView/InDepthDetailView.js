import React from 'react';
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
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  toprow: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    outline: 0,
    align: 'center',
  },

  bottomrow: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    outline: 0,
    align: 'center',
  },

  description: {
    padding: theme.spacing(3),

    textAlign: 'left',
    color: theme.palette.text.primary,
  },
}));

export default function InDepthDetailView(placeData) {
  const { id } = useParams();
  const classes = useStyles();

  return !placeData ? null : (
    <Container disableGutters={true}>
      <Grid
        container
        justify={'space-evenly'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Grid item xs={12}>
          <Image src={placeData.primaryPictureUrl} alt={placeData.title} />
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <ApertureIcon />
            <Typography variant={'body2'}>{placeData.aperture}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <FocalLengthIcon />
            <Typography variant={'body2'}>{placeData.focalLength}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <ShutterSpeedIcon />
            <Typography variant={'body2'}>{placeData.shutterSpeed}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <IsoIcon />
            <Typography variant={'body2'}>{placeData.iso}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <FlashIcon />
            <Typography variant={'body2'}>{placeData.flash}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <YouTubeIcon />
            <Typography variant={'body2'}>{placeData.youTubeUrl}</Typography>
          </div>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={2}>
            <div className={classes.toprow}>
              <ExtrasIcon />
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className={classes.bottomrow}>
              <Typography variant={'body2'}>{placeData.extraOne}</Typography>
              <Typography variant={'body2'}>{placeData.extraTwo}</Typography>
              <Typography variant={'body2'}>
                {placeData.particularities}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.description}>
          <Typography variant={'body2'}>
            {placeData.pictureDescription}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
