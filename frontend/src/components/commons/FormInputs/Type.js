import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';

const types = [
  {
    value: 'cityscape',
    label: 'Stadt',
  },
  {
    value: 'harbour',
    label: 'Hafen',
  },
  {
    value: 'landscape',
    label: 'Landschaft',
  },
  {
    value: 'night',
    label: 'Nachtaufnahme',
  },
];

export default function Type({ placeData }) {
  const [type, setType] = useState('cityscape');

  return (
    <Grid item xs={12} sm={6}>
      <Tooltip title={'Bitte auswählen'} arrow>
        <TextField
          select
          value={type}
          onChange={handleChange}
          name={'type'}
          variant={'outlined'}
          fullWidth
          id={'type'}
          label={'Bildtyp'}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Tooltip>
    </Grid>
  );

  function handleChange(event) {
    setType(event.target.value);
  }
}
