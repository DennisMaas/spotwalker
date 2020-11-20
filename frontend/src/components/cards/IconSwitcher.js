import React from 'react';
import CityscapeIcon from './avatarIcons/CityscapeIcon';
import HarbourIcon from './avatarIcons/HarbourIcon';
import LandscapeIcon from './avatarIcons/LandscapeIcon';
import NightIcon from './avatarIcons/NightIcon';
import ImageIcon from './avatarIcons/ImageIcon';

export default function IconSwitcher({ placeData }) {
  switch (placeData.type) {
    case 'architecture':
      return <CityscapeIcon />;
    case 'harbour':
      return <HarbourIcon />;
    case 'landscape':
      return <LandscapeIcon />;
    case 'night':
      return <NightIcon />;
    default:
      return <ImageIcon />;
  }
}
