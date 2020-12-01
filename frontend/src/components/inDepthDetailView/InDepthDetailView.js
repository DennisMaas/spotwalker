import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import FocalLengthIcon from '../nonMuiIcons/exifIcons/FocalLengthIcon';
import IsoIcon from '../nonMuiIcons/exifIcons/IsoIcon';
import YouTubeIcon from '../nonMuiIcons/exifIcons/YouTubeIcon';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlacesContext from '../../contexts/PlacesContext';
import CameraOutlinedIcon from '@material-ui/icons/CameraOutlined';
import LoupeOutlinedIcon from '@material-ui/icons/LoupeOutlined';
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined';
import ShutterSpeedOutlinedIcon from '@material-ui/icons/ShutterSpeedOutlined';

import Link from '@material-ui/core/Link';
import TopBar from '../commons/TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100vh',
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
  link: {
    color: theme.palette.text.secondary,
  },

  description: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
}));

export default function InDepthDetailView() {
  const classes = useStyles();
  const { id } = useParams();
  const { places, update, remove } = useContext(PlacesContext);
  const place = places.find((place) => place.id === id);

  return !place ? null : (
    <Container disableGutters={true}>
      <Grid
        container
        justify={'space-evenly'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Grid item xs={12}>
          <TopBar id={id} update={update} remove={remove} title={place.title} />
        </Grid>
        <Grid item xs={12}>
          <img
            className={classes.image}
            src={place.primaryPictureUrl}
            alt={place.title}
          />
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <CameraOutlinedIcon />
            <Typography variant={'body2'}>{place.aperture}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <FocalLengthIcon />
            <Typography variant={'body2'}>{place.focalLength}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <ShutterSpeedOutlinedIcon />
            <Typography variant={'body2'}>{place.shutterSpeed}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <IsoIcon />
            <Typography variant={'body2'}>{place.iso}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            <FlashOnOutlinedIcon />
            <Typography variant={'body2'}>{place.flash}</Typography>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.toprow}>
            {place.youTubeUrl && (
              <Link
                underline={'none'}
                className={classes.link}
                href={place.youTubeUrl}
              >
                <YouTubeIcon />
                <Typography variant={'body2'}>Video</Typography>
              </Link>
            )}
          </div>
        </Grid>

        <Grid container item xs={12}>
          {(place.extraOne || place.particularities) && (
            <Grid item xs={2}>
              <div className={classes.toprow}>
                <LoupeOutlinedIcon />
              </div>
            </Grid>
          )}
          <Grid item xs={10}>
            <div className={classes.bottomrow}>
              <Typography variant={'body2'}>{place.extraOne}</Typography>
              <Typography variant={'body2'}>{place.extraTwo}</Typography>
              <Typography variant={'body2'}>{place.particularities}</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.description}>
          <Typography variant={'body2'}>{place.pictureDescription}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
