import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import LandscapeIcon from './avatarIcons/LandscapeIcon';
import ArchitectureIcon from './avatarIcons/ArchitectureIcon';
import HarbourIcon from './avatarIcons/HarbourIcon';
import NightIcon from './avatarIcons/NightIcon';
import ImageIcon from './avatarIcons/ImageIcon';
import PlacesContext from '../../contexts/PlacesContext';

export default function IconSwitcher() {
  const { id } = useParams();
  const { places } = useContext(PlacesContext);
  const placeData = places.find((place) => place.id === id);

  switch (placeData.type) {
    case 'architecture':
      return <ArchitectureIcon />;
      break;
    case 'harbour':
      <HarbourIcon />;
      break;
    case 'landscape':
      return <LandscapeIcon />;
      break;
    case 'night':
      return <NightIcon />;
      break;
    default:
      return <ImageIcon />;
  }
}
