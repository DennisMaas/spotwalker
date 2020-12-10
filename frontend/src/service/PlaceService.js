import axios from 'axios';
import { axiosClient } from './axiosClient';

export const getPlaces = () =>
  axiosClient()
    .get('/api/places')
    .then((response) => response.data);

export const addPlace = (
  primaryImageName,
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
      primaryImageName,
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
  primaryImageName,
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
      primaryImageName,
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

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return axiosClient
    .post('/api/places/image', formData)
    .then((response) => response.data);
};
