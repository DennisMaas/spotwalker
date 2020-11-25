import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ImageSearchOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  picture: {
    maxWidth: '100%',
    maxHeight: '60vh',
  },

  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UploadPicture() {
  const [picture, setPicture] = useState(null);
  const classes = useStyles();

  return (
    <>
      <input
        hidden
        id={'contained-button-file'}
        accept={'image/*'}
        type={'file'}
        onChange={handlePicture}
      />
      <label htmlFor={'contained-button-file'}>
        <Button
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          aria-label={'upload picture'}
          component={'span'}
          startIcon={<ImageSearchOutlined />}
        >
          Foto auswählen
        </Button>
      </label>
      <img className={classes.picture} alt={''} src={picture} />
    </>
  );

  function handlePicture(event) {
    const pictureFile = event.target.files[0];
    setPicture(URL.createObjectURL(pictureFile));
    const formData = new FormData();
    formData.append('file', pictureFile);
    axios
      .post('/api/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  }
}
