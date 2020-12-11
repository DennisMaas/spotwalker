import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ImageSearchOutlined } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  picture: {
    maxWidth: '100%',
    maxHeight: '60vh',
  },

  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UploadImage({
  handleImageChange,
  placeData,
  imageUrl,
}) {
  const classes = useStyles();

  return (
    <Grid container item justify={'center'}>
      <input
        hidden
        id={'contained-button-file'}
        accept={'image/*'}
        type={'file'}
        onChange={handleImageChange}
      />
      <label htmlFor={'contained-button-file'}>
        <Button
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          aria-label={'upload image'}
          component={'span'}
          startIcon={<ImageSearchOutlined />}
        >
          Foto auswählen
        </Button>
      </label>
      {imageUrl ? (
        <img className={classes.picture} alt={''} src={imageUrl} />
      ) : (
        <img
          className={classes.picture}
          alt={''}
          src={placeData.primaryImageUrl}
        />
      )}
    </Grid>
  );
}
