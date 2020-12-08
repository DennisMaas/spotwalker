import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import PlaceForm from './commons/PlaceForm';
import Typography from '@material-ui/core/Typography';
import PlacesContext from '../contexts/PlacesContext';

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

export default function NewPlacePage() {
  const { update, places } = useContext(PlacesContext);
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const place = places.find((place) => place.id === id);

  return !place ? null : (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Foto bearbeiten
        </Typography>
        <PlaceForm onSave={handleSave} />
      </div>
    </Container>
  );

  function handleSave(place) {
    const {
      id,
      primaryPictureUrl,
      type,
      title,
      address,
      lat,
      lng,
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
    update(
      id,
      primaryPictureUrl,
      type,
      title,
      address,
      lat,
      lng,
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
    history.goBack();
  }
}
