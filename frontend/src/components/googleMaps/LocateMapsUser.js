import IconButton from '@material-ui/core/IconButton';
import MyLocationOutlinedIcon from '@material-ui/icons/MyLocationOutlined';
import React from 'react';

export default function LocateMapsUser({ panTo }) {
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
      aria-label={'find-user-location'}
    >
      <MyLocationOutlinedIcon color={'secondary'} fontSize={'large'} />
    </IconButton>
  );
}
