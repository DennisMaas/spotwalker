import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ArchitectureIcon from './avatarIcons/ArchitectureIcon';
import HarbourIcon from './avatarIcons/HarbourIcon';
import LandscapeIcon from './avatarIcons/LandscapeIcon';
import NightIcon from './avatarIcons/NightIcon';
import ImageIcon from './avatarIcons/ImageIcon';

const useStyles = makeStyles({
  media: {
    height: '27vh',
  },
});

export default function PlaceCard({ placeData }) {
  const classes = useStyles();
  const history = useHistory();

  if (placeData.type === 'cityscape') {
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
  } else if (placeData.type === 'harbour') {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label={placeData.type} className={classes.avatar}>
              <HarbourIcon />
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
  } else if (placeData.type === 'landscape') {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label={placeData.type} className={classes.avatar}>
              <LandscapeIcon />
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
  } else if (placeData.type === 'night') {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label={placeData.type} className={classes.avatar}>
              <NightIcon />
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
  } else {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label={placeData.type} className={classes.avatar}>
              <ImageIcon />
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
}
