import React from 'react';
import CityscapeIcon from './avatarIcons/CityscapeIcon';
import HarbourIcon from './avatarIcons/HarbourIcon';
import LandscapeIcon from './avatarIcons/LandscapeIcon';
import NightIcon from './avatarIcons/NightIcon';
import ImageIcon from './avatarIcons/ImageIcon';

export default function IconSwitcher({ placeData }) {
  if (placeData.type === 'architecture') {
    return <CityscapeIcon />;
  } else if (placeData.type === 'harbour') {
    return <HarbourIcon />;
  } else if (placeData.type === 'landscape') {
    return <LandscapeIcon />;
  } else if (placeData.type === 'night') {
    return <NightIcon />;
  } else {
    return <ImageIcon />;
  }
}
