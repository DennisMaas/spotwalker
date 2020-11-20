import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PlaceTypeIcon from './PlaceTypeIcon';

const useStyles = makeStyles({
  media: {
    height: '27vh',
  },
});

export default function PlaceCard({ placeData }) {
  const classes = useStyles();
  const history = useHistory();
  const latitude = placeData.latitude;
  const longitude = placeData.longitude;
  const gMapUrl =
    'https://www.google.com/maps/@' + longitude + ',' + latitude + ',' + '14z';

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label={placeData.type} className={classes.avatar}>
            <PlaceTypeIcon type={placeData.type} />
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
