import axios from 'axios';

export const getPlaces = () =>
  axios.get('/api/places').then((response) => response.data);

export const addPlace = (
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
) =>
  axios
    .post('/api/places', {
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
    })
    .then((response) => response.data);

export const updatePlace = (
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
) =>
  axios
    .put('/api/places/' + id, {
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
    })
    .then((response) => response.data);

export const removePlace = (id) => axios.delete('/api/places/' + id);
