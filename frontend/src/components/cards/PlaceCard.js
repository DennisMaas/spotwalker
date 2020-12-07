import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import PlaceTypeIcon from './PlaceTypeIcon';
import DirectionsOutlinedIcon from '@material-ui/icons/DirectionsOutlined';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '27vh',
  },
  directions: {
    color: theme.palette.text.secondary,
  },
}));

export default function PlaceCard({
  place,
  bottomBarAction,
  setBottomBarAction,
}) {
  const classes = useStyles();
  const history = useHistory();
  const { lat, lng } = place;
  const gMapUrl =
    'https://www.google.com/maps/dir//' +
    lat +
    ',' +
    lng +
    '/@' +
    lat +
    ',' +
    lng +
    ',20z';

  return (
    <Card className={classes.root} variant={'outlined'}>
      <CardHeader
        avatar={
          <Avatar
            alt={place.type}
            aria-label={place.type}
            className={classes.avatar}
          >
            <PlaceTypeIcon type={place.type} />
          </Avatar>
        }
        action={
          <IconButton href={gMapUrl} aria-label="navigate">
            <DirectionsOutlinedIcon className={classes.directions} />
          </IconButton>
        }
        title={place.title}
        subheader={place.street}
      />
      <CardActionArea onClick={() => history.push(`/places/${place.id}`)}>
        <CardMedia
          className={classes.media}
          component={'img'}
          image={place.primaryPictureUrl}
          title={place.title}
        />
      </CardActionArea>
    </Card>
  );
}
