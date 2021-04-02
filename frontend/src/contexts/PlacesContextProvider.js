import React, { useEffect, useState } from 'react';
import PlacesContext from './PlacesContext';
import {
  addPlace,
  getPlaces,
  removePlace,
  updatePlace,
} from '../service/PlaceService';
import UserContext from './UserContext';

export default function PlacesContextProvider({ children }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then(setPlaces).catch(console.log);
  }, []);

  const create = (
    creatorOfEntry,
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
    addPlace(
      creatorOfEntry,
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
    )
      .then((newPlace) => setPlaces([...places, newPlace]))
      .catch(console.log);

  const update = (
    creatorOfEntry,
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
  ) => {
    updatePlace(
      creatorOfEntry,
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
