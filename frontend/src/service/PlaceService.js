import { axiosClient } from './axiosClient';

export const getPlaces = () =>
  axiosClient.get('/api/places').then((response) => response.data);

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
  axiosClient
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
  axiosClient
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

export const removePlace = (id) => axiosClient.delete('/api/places/' + id);
