import React from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import PlaceForm from './commons/PlaceForm';
import Typography from '@material-ui/core/Typography';
import GetGoogleMap from './googleMaps/GetGoogleMap';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NewPlacePage({ create }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Neues Foto anlegen
        </Typography>
        <PlaceForm onSave={handleSave} />
      </div>
    </Container>
  );

  function handleSave(place) {
    const {
      primaryPictureUrl,
      type,
      title,
      street,
      address,
      latitude,
      longitude,
      placeDescription,
      pictureDescription,
      aperture,
      focalLength,
      shutterSpeed,
      iso,
      flash,
      youTubeUrl,
      extraOne,
      extraTwo,
      particularities,
    } = place;
    create(
      primaryPictureUrl,
      type,
      title,
      street,
      address,
      latitude,
      longitude,
      placeDescription,
      pictureDescription,
      aperture,
      focalLength,
      shutterSpeed,
      iso,
      flash,
      youTubeUrl,
      extraOne,
      extraTwo,
      particularities
    );
    history.push('/overview');
  }
}
