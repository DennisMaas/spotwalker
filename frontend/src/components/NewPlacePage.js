import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UploadPicture from './commons/UploadPicture';
import PlaceForm from './commons/PlaceForm';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

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
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Neues Foto anlegen
        </Typography>
        <Grid container item justify={'center'}>
          <UploadPicture />
        </Grid>
        <PlaceForm />
      </div>
      <Grid container justify={'flex-end'}>
        <Grid item xs={6}>
          <Button
            onClick={onCancel}
            type="cancel"
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<CancelOutlinedIcon />}
          >
            Abbrechen
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveOutlinedIcon />}
          >
            Foto anlegen
          </Button>
        </Grid>
      </Grid>
    </Container>
  );

  function onCancel() {
    history.goBack();
  }
}
