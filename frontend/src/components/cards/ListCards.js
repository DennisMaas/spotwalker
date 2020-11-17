import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import ArchitectureIcon from './avatarIcons/ArchitectureIcon';
import CardHeader from '@material-ui/core/CardHeader';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: '25vh',
  },
});

export default function ListCards({ type, title, street, primaryPictureUrl }) {
  const classes = useStyles();

  return (
    <Container disableGutters={true}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label={type} className={classes.avatar}>
              <ArchitectureIcon />
            </Avatar>
          }
          title={title}
          subheader={street}
        />
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component={'img'}
            image={primaryPictureUrl}
            title={title}
          />
        </CardActionArea>
      </Card>
    </Container>
  );
}
