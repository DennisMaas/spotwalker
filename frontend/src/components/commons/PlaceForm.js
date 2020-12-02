import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import GetGoogleMap from '../googleMaps/GetGoogleMap';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  primaryPictureUrl: '',
  type: 'cityscape',
  title: '',
  street: '',
  address: '',
  lat: 0,
  lng: 0,
  placeDescription: '',
  pictureDescription: '',
  aperture: '',
  focalLength: '',
  shutterSpeed: '',
  iso: '',
  flash: '',
  youTubeUrl: '',
  extraOne: '',
  extraTwo: '',
  particularities: '',
};

const types = [
  {
    value: 'cityscape',
    label: 'Stadt',
  },
  {
    value: 'harbour',
    label: 'Hafen',
  },
  {
    value: 'landscape',
    label: 'Landschaft',
  },
  {
    value: 'night',
    label: 'Nachtaufnahme',
  },
];

export default function PlaceForm({ onSave, place = initialState }) {
  const classes = useStyles();
  const history = useHistory();
  const [placeData, setPlaceData] = useState(place);

  const setMarker = (lat, lng) =>
    setPlaceData({ ...placeData, lat: lat, lng: lng });
  return (
    <>
      {/*      <UploadPicture />*/}
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={placeData.title}
              onChange={handleChange}
              name={'title'}
              variant={'outlined'}
              fullWidth
              id={'title'}
              label={'Titel des Bildes'}
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <GetGoogleMap
              lat={placeData.lat}
              lng={placeData.lng}
              setMarker={setMarker}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Latitude: {placeData.lat}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Longitude {placeData.lng}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={placeData.pictureDescription}
              onChange={handleChange}
              name={'pictureDescription'}
              variant={'outlined'}
              fullWidth
              id={'pictureDescription'}
              label={'Bildbeschreibung'}
              multiline
              rows={3}
              rowsMax={6}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={placeData.placeDescription}
              onChange={handleChange}
              name={'placeDescription'}
              variant={'outlined'}
              fullWidth
              id={'placeDescription'}
              label={'placeDescription'}
              multiline
              rows={3}
              rowsMax={6}
              required
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              value={placeData.aperture}
              onChange={handleChange}
              name={'aperture'}
              variant={'outlined'}
              fullWidth
              id={'aperture'}
              label={'Blende'}
              helperText={'z.B. f8, nicht 8 oder f 8'}
              required
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              value={placeData.focalLength}
              onChange={handleChange}
              name={'focalLength'}
              variant={'outlined'}
              fullWidth
              id={'focalLength'}
              label={'Brennweite'}
              required
              helperText={'z.B. 20mm, nicht 20 mm oder 20'}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              value={placeData.shutterSpeed}
              onChange={handleChange}
              name={'shutterSpeed'}
              variant={'outlined'}
              fullWidth
              id={'shutterSpeed'}
              label={'Belichtungszeit'}
              required
              helperText={'z.B. 1/50s oder 50s'}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              value={placeData.iso}
              onChange={handleChange}
              name={'iso'}
              variant={'outlined'}
              fullWidth
              id={'iso'}
              label={'ISO'}
              required
              helperText={'nur eine Zahl, z.B 200'}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              value={placeData.flash}
              onChange={handleChange}
              name={'flash'}
              variant={'outlined'}
              required
              fullWidth
              id={'flash'}
              label={'Blitz'}
              helperText={'z.B. kein, 1. Verschluss, 2. Verschluss'}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              value={placeData.youTubeUrl}
              onChange={handleChange}
              name={'youTubeUrl'}
              variant={'outlined'}
              fullWidth
              id={'youTubeUrl'}
              label={'YouTube'}
              helperText={'https://youtu.be/...'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={placeData.extraOne}
              onChange={handleChange}
              name={'extraOne'}
              variant={'outlined'}
              fullWidth
              id={'extraOne'}
              label={'Zubehör 1'}
              helperText={'Ein Stichwort, z.B. Stativ'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={placeData.extraTwo}
              onChange={handleChange}
              name={'extraTwo'}
              variant={'outlined'}
              fullWidth
              id={'extraTwo'}
              label={'Zubehör 2'}
              helperText={'Ein Stichwort, z.B. ND 60'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={placeData.particularities}
              onChange={handleChange}
              name={'particularities'}
              variant={'outlined'}
              fullWidth
              id={'particularities'}
              label={'Besonderheiten'}
              helperText={'Auch mehr als ein Stichwort'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              value={placeData.type}
              onChange={handleChange}
              name={'type'}
              variant={'outlined'}
              fullWidth
              id={'type'}
              label={'Bildtyp'}
              helperText={'Fehlt etwas? Dann sag´s mir!'}
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container justify={'flex-end'}>
          <Grid item xs={6}>
            <Button
              onClick={onCancel}
              type={'button'}
              variant={'outlined'}
              color={'primary'}
              className={classes.button}
              startIcon={<CancelOutlinedIcon />}
            >
              Abbrechen
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              className={classes.button}
              startIcon={<SaveOutlinedIcon />}
            >
              Foto anlegen
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );

  function onCancel() {
    history.push('/overview');
  }

  function handleChange(event) {
    setPlaceData({ ...placeData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(placeData);
  }
}
