import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import ArchitectureIcon from './avatarIcons/ArchitectureIcon';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles({
  media: {
    height: '27vh',
  },
});

export default function PlaceCard(placeData) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  return (
    <Card key={placeData.id} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label={placeData.type} className={classes.avatar}>
            <ArchitectureIcon />
          </Avatar>
        }
        title={placeData.title}
        subheader={placeData.street}
      />
      <CardActionArea onClick={() => history.push(`/places/${id}`)}>
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
