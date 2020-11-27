import IconButton from '@material-ui/core/IconButton';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import React from 'react';

export default function LocateUser({ panTo }) {
  return (
    <IconButton
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
      aria-label={'compass'}
    >
      <ExploreOutlinedIcon fontSize={'large'} />
    </IconButton>
  );
}
