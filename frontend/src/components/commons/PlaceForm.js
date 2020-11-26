import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import MenuItem from '@material-ui/core/MenuItem';

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
  latitude: '',
  longitude: '',
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

  return (
    <>
      {/*<UploadPicture />*/}
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
            <TextField
              value={placeData.primaryPictureUrl}
              onChange={handleChange}
              name={'primaryPictureUrl'}
              variant={'outlined'}
              fullWidth
              id={'primaryPictureUrl'}
              label={'primaryPictureUrl'}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={placeData.street}
              onChange={handleChange}
              name={'street'}
              variant={'outlined'}
              fullWidth
              id={'street'}
              label={'street'}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={placeData.address}
              onChange={handleChange}
              name={'address'}
              variant={'outlined'}
              fullWidth
              id={'address'}
              label={'address'}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={placeData.latitude}
              onChange={handleChange}
              name={'latitude'}
              variant={'outlined'}
              fullWidth
              id={'latitude'}
              label={'latitude'}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={placeData.longitude}
              onChange={handleChange}
              name={'longitude'}
              variant={'outlined'}
              fullWidth
              id={'longitude'}
              label={'longitude'}
              required
            />
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
            <Tooltip title={'z.B. f8'} arrow>
              <TextField
                value={placeData.aperture}
                onChange={handleChange}
                name={'aperture'}
                variant={'outlined'}
                fullWidth
                id={'aperture'}
                label={'Blende'}
                required
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Tooltip title={'z.B. 20mm'} arrow>
              <TextField
                value={placeData.focalLength}
                onChange={handleChange}
                name={'focalLength'}
                variant={'outlined'}
                fullWidth
                id={'focalLength'}
                label={'Brennweite'}
                required
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Tooltip title={'z.B. 1/50s oder 50s'} arrow>
              <TextField
                value={placeData.shutterSpeed}
                onChange={handleChange}
                name={'shutterSpeed'}
                variant={'outlined'}
                fullWidth
                id={'shutterSpeed'}
                label={'Belichtungszeit'}
                required
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Tooltip title={'z.B. 200'} arrow>
              <TextField
                value={placeData.iso}
                onChange={handleChange}
                name={'iso'}
                variant={'outlined'}
                fullWidth
                id={'iso'}
                label={'ISO'}
                required
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Tooltip title={'z.B. kein'} arrow>
              <TextField
                value={placeData.flash}
                onChange={handleChange}
                name={'flash'}
                variant={'outlined'}
                required
                fullWidth
                id={'flash'}
                label={'Blitz'}
              />
            </Tooltip>
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
            />
          </Grid>
          <Grid item xs={6}>
            <Tooltip title={'Ein Stichwort, z.B. Stativ'} arrow>
              <TextField
                value={placeData.extraOne}
                onChange={handleChange}
                name={'extraOne'}
                variant={'outlined'}
                fullWidth
                id={'extraOne'}
                label={'Zubehör 1'}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title={'Ein Stichwort, z.B. ND 60'} arrow>
              <TextField
                value={placeData.extraTwo}
                onChange={handleChange}
                name={'extraTwo'}
                variant={'outlined'}
                fullWidth
                id={'extraTwo'}
                label={'Zubehör 2'}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip
              title={
                'Stichwortartig, z.B. Mehrfachbelichtung, Stitchingsoftware'
              }
              arrow
            >
              <TextField
                value={placeData.particularities}
                onChange={handleChange}
                name={'particularities'}
                variant={'outlined'}
                fullWidth
                id={'particularities'}
                label={'Besonderheiten'}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title={'Bitte auswählen'} arrow>
              <TextField
                select
                value={placeData.type}
                onChange={handleChange}
                name={'type'}
                variant={'outlined'}
                fullWidth
                id={'type'}
                label={'Bildtyp'}
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container justify={'flex-end'}>
          <Grid item xs={6}>
            <Button
              onClick={onCancel}
              type={'cancel'}
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
    history.goBack();
  }


  function handleChange(event) {
    setPlaceData({ ...placeData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(placeData);
  }
}
