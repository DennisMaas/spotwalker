import { useEffect, useState } from 'react';
import { addPlace, getPlaces, updatePlace } from '../../service/PlaceService';

export default function usePlaces() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then(setPlaces);
  }, []);

  const create = (
    primaryPictureUrl,
    type,
    title,
    street,
    address,
    latitude,
    longitude,
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
      latitude,
      longitude,
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
    ).then((newPlace) => setPlaces([...places, newPlace]));

  const update = (
    id,
    primaryPictureUrl,
    type,
    title,
    street,
    address,
    latitude,
    longitude,
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
      latitude,
      longitude,
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
    ).then((updatedPlace) =>
      setPlaces([
        ...places.filter((place) => place.id !== updatedPlace.id),
        updatedPlace,
      ])
    );
  };
  return [places, create, update];
}
