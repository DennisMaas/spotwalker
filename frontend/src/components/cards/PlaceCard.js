import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  media: {
    height: '27vh',
  },
});

export default function PlaceCard({ placeData }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label={placeData.type} className={classes.avatar}>
            switch (placeData.type) {
            case "architecture":
            return <ArchitectureIcon />;
            break;
            case "harbour":
            <HarbourIcon />;
            break;
            case "landscape":
            return <LandscapeIcon />;
            break;
            case "night":
            return <NightIcon />;
            break;
            default:
            return <ImageIcon />;
          }
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
