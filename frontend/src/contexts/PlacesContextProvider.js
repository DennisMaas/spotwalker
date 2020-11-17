import React from 'react';
import PlacesContext from './PlacesContext';

export default function PlacesContextProvider({ children }) {
  return <PlacesContext.Provider value={{}}>{children}</PlacesContext.Provider>;
}
