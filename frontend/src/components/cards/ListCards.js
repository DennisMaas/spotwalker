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
    paddingTop: '56.25%',
  },
});

export default function ListCards({ type, title, street, primaryPictureUrl }) {
  const classes = useStyles({ ratio: 1.778 });

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
            src={
              'https://cdn.taschen.com/media/images/1640/disney_mickey_mouse_xl_d_3d_01148_1811081034_id_1222966.png'
            }
            title={title}
          />
        </CardActionArea>
      </Card>
    </Container>
  );
}
