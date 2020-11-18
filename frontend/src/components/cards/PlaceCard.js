import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import ArchitectureIcon from './avatarIcons/ArchitectureIcon';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import PlacesContext from '../../contexts/PlacesContext';

const useStyles = makeStyles({
  media: {
    height: '27vh',
  },
});

export default function PlaceCard() {
  const classes = useStyles();
  const { places } = useContext(PlacesContext);
  const placeData = places.find((placeData) => placeData.id === id);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label={placeData.type} className={classes.avatar}>
            <ArchitectureIcon />
          </Avatar>
        }
        title={placeData.title}
        subheader={placeData.street}
      />
      <CardActionArea onClick={() => history.push(`/places/${placeData.id}`)}>
        <CardMedia
          className={classes.media}
          component={'img'}
          image={placeData.primaryPictureUrl}
          title={placeData.title}
        />
      </CardActionArea>
    </Card>
  );
}
