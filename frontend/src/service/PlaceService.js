import axios from 'axios';

export const getPlaces = () =>
  axios.get('/api/places').then((response) => response.data);

export const addPlace = (
  primaryPictureUrl,
  type,
  title,
  street,
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
      street,
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
  street,
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
    .put('/api/places' + id, {
      id,
      primaryPictureUrl,
      type,
      title,
      street,
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
