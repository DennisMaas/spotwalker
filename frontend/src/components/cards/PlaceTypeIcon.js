import React from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import DirectionsBoatOutlinedIcon from '@material-ui/icons/DirectionsBoatOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import LandscapeOutlinedIcon from '@material-ui/icons/LandscapeOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';

export default function PlaceTypeIcon({ type }) {
  switch (type) {
    case 'cityscape':
      return <HomeWorkOutlinedIcon />;
    case 'harbour':
      return <DirectionsBoatOutlinedIcon />;
    case 'landscape':
      return <LandscapeOutlinedIcon />;
    case 'night':
      return <NightsStayOutlinedIcon />;
    default:
      return <ImageOutlinedIcon />;
  }
}
