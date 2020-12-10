import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ImageSearchOutlined } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { uploadImage } from '../../service/PlaceService';

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

export default function UploadImage(placeData, setPlaceData) {
  const [image, setImage] = useState(null);
  const classes = useStyles();

  return (
    <Grid container item justify={'center'}>
      <input
        hidden
        id={'contained-button-file'}
        accept={'image/*'}
        type={'file'}
        onChange={handlePictureChange}
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
      <img className={classes.picture} alt={''} src={image} />
    </Grid>
  );

  function handlePictureChange(event) {
    const imageFile = event.target.files[0];
    imageFile
      ? uploadImage(imageFile)
          .then((data) =>
            setPlaceData({ ...placeData, primaryImageName: data })
          )
          .catch((error) => console.log(error))
      : setPlaceData({
          ...placeData,
          primaryImageName: placeData.primaryImageName,
        });
  }
}
