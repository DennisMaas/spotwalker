import axios from 'axios';

export const getPlaces = () =>
  axios.get('/api/places').then((response) => response.data);
