import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function PlaceForm() {
  const classes = useStyles();
  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="imageTitle"
            variant="outlined"
            required
            fullWidth
            id="imageTitle"
            label="Titel des Bildes"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="pictureDescription"
            label="Bildbeschreibung"
            name="pictureDescription"
            multiline
            rows={3}
            rowsMax={6}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title={'z.B. f8'} arrow>
            <TextField
              name="apertureSettings"
              variant="outlined"
              required
              fullWidth
              id="apertureSettings"
              label="Blende"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title={'z.B. 20mm'} arrow>
            <TextField
              name="focalLengthSettings"
              variant="outlined"
              required
              fullWidth
              id="focalLengthSettings"
              label="Brennweite"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title={'z.B. 1/50s oder 50s'} arrow>
            <TextField
              name="shutterSpeedSettings"
              variant="outlined"
              required
              fullWidth
              id="shutterSpeedSettings"
              label="Belichtungszeit"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title={'z.B. 200'} arrow>
            <TextField
              name="isoSettings"
              variant="outlined"
              required
              fullWidth
              id="isoSettings"
              label="ISO"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title={'z.B. kein'} arrow>
            <TextField
              name="flashSettings"
              variant="outlined"
              required
              fullWidth
              id="flashSettings"
              label="Blitz"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            name="youTubeUrl"
            variant="outlined"
            fullWidth
            id="youTubeUrl"
            label="YouTube"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title={'Ein Stichwort, z.B. Stativ'} arrow>
            <TextField
              name="extraOne"
              variant="outlined"
              fullWidth
              id="extraOne"
              label="Zubehör 1"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title={'Ein Stichwort, z.B. ND 60'} arrow>
            <TextField
              name="extraTwo"
              variant="outlined"
              fullWidth
              id="extraTwo"
              label="Zubehör 2"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip
            title={'Stichwortartig, z.B. Mehrfachbelichtung, Stitchingsoftware'}
            arrow
          >
            <TextField
              name="particularities"
              variant="outlined"
              fullWidth
              id="particularities"
              label="Besonderheiten"
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="Ich bin mir sicher, dass meine Einträge Dennis nicht ärgern."
          />
        </Grid>
      </Grid>
    </form>
  );
}
