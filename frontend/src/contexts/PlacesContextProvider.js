import React, { useEffect, useState } from 'react';
import PlacesContext from './PlacesContext';
import {
  addPlace,
  getPlaces,
  removePlace,
  updatePlace,
} from '../service/PlaceService';

export default function PlacesContextProvider({ children }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then(setPlaces).catch(console.log);
  }, []);

  const create = (
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
    addPlace(
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
    )
      .then((newPlace) => setPlaces([...places, newPlace]))
      .catch(console.log);

  const update = (
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
  ) => {
    updatePlace(
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
    )
      .then((updatedPlace) =>
        setPlaces([
          ...places.filter((place) => place.id !== updatedPlace.id),
          updatedPlace,
        ])
      )
      .catch(console.log);
  };

  const remove = (id) =>
    removePlace(id)
      .then(() => setPlaces(places.filter((place) => place.id !== id)))
      .catch(console.log);

  return (
    <PlacesContext.Provider value={{ places, create, remove, update }}>
      {children}
    </PlacesContext.Provider>
  );
}
