import React, { useEffect, useState } from 'react';
import PlacesContext from './PlacesContext';
import { getPlaces } from '../service/PlaceService';

export default function PlacesContextProvider({ children }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then(setPlaces).catch(console.log);
  }, []);

  return (
    <PlacesContext.Provider value={{ places }}>
      {children}
    </PlacesContext.Provider>
  );
}
