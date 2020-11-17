import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListCards from './cards/ListCards';
import michel from '../images/michel.jpg';
import { Container, Grid } from '@material-ui/core';

const placeData1 = {
  id: 'Id1',
  primaryPictureUrl:
    'https://images.pexels.com/photos/2309270/pexels-photo-2309270.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  type: 'landscape',
  title: 'Der Michel',
  street: 'Englische Planke 1',
  address: 'Englische Planke 1, 20357 Hamburg',
  placeDescription:
    'Die ersten Häuser entstanden im Karoviertel wahrscheinlich zu Beginn des 17. Jahrhunderts.  ',
  pictureDescription:
    'Für diese schönen farbig gestrichenen Häuser sollte man eine möglichst weite Brennweite benutzen. ',
  aperture: 'f8',
  focalLength: '20',
  shutterSpeed: '320',
  iso: '200',
  youTubeUrl: 'https://youtu.be/xZuCQPrUFlc',
  extraOne: 'Stitching-Software',
  extraTwo: 'Ultraweitwinkel',
};
const placeData2 = {
  id: 'Id2',
  primaryPictureUrl: { michel },
  type: 'landscape',
  title: 'Die Karolinenstraße',
  street: 'Karolinenstraße 24',
  address: 'Karolinenstraße 24, 20459 Hamburg',
  placeDescription:
    'Hamburgs bekannteste Kirche. Kann gerne betreten werden, aber bitte ohne Blitz fotografieren und die Hausregeln beachten. Der Eintritt zum Turm ist nicht gratis, aber dafür auch nicht umsonst, denn die Perspektive auf Hamburg ist einmalig und besonders zum Sonnenuntergang bietet sich ein einmaliges Panorama.',
  pictureDescription:
    'Bei diesem Bild heißt es Ausschau halten und in die Knie gehen. Der Durchgang vom Thielickestieg bietet einen natürlich Rahmen für den Michel. Geschossen wurden 9 Einzelaufnahmen, die danach zu einem Panorama zusammengesetzt worden sind. Zum einen vergrößert das den Blickwinkel, zum anderen natürlich die Pixelzahl und damit die maximal mögliche Druckgröße.',
  aperture: 'f0',
  focalLength: '20',
  shutterSpeed: '160',
  iso: '200',
  youTubeUrl: 'https://youtu.be/xZuCQPrUFlc',
  extraOne: '',
  extraTwo: '',
};
const placeData3 = {
  id: 'Id3',
  primaryPictureUrl: michel,
  type: 'landscape',
  title: 'Die Karolinenstraße',
  street: 'Karolinenstraße 24',
  address: 'Karolinenstraße 24, 20459 Hamburg',
  placeDescription:
    'Hamburgs bekannteste Kirche. Kann gerne betreten werden, aber bitte ohne Blitz fotografieren und die Hausregeln beachten. Der Eintritt zum Turm ist nicht gratis, aber dafür auch nicht umsonst, denn die Perspektive auf Hamburg ist einmalig und besonders zum Sonnenuntergang bietet sich ein einmaliges Panorama.',
  pictureDescription:
    'Bei diesem Bild heißt es Ausschau halten und in die Knie gehen. Der Durchgang vom Thielickestieg bietet einen natürlich Rahmen für den Michel. Geschossen wurden 9 Einzelaufnahmen, die danach zu einem Panorama zusammengesetzt worden sind. Zum einen vergrößert das den Blickwinkel, zum anderen natürlich die Pixelzahl und damit die maximal mögliche Druckgröße.',
  aperture: 'f0',
  focalLength: '20',
  shutterSpeed: '160',
  iso: '200',
  youTubeUrl: 'https://youtu.be/xZuCQPrUFlc',
  extraOne: '',
  extraTwo: '',
};
const placeData4 = {
  id: 'Id4',
  primaryPictureUrl: michel,
  type: 'landscape',
  title: 'Die Karolinenstraße',
  street: 'Karolinenstraße 24',
  address: 'Karolinenstraße 24, 20459 Hamburg',
  placeDescription:
    'Hamburgs bekannteste Kirche. Kann gerne betreten werden, aber bitte ohne Blitz fotografieren und die Hausregeln beachten. Der Eintritt zum Turm ist nicht gratis, aber dafür auch nicht umsonst, denn die Perspektive auf Hamburg ist einmalig und besonders zum Sonnenuntergang bietet sich ein einmaliges Panorama.',
  pictureDescription:
    'Bei diesem Bild heißt es Ausschau halten und in die Knie gehen. Der Durchgang vom Thielickestieg bietet einen natürlich Rahmen für den Michel. Geschossen wurden 9 Einzelaufnahmen, die danach zu einem Panorama zusammengesetzt worden sind. Zum einen vergrößert das den Blickwinkel, zum anderen natürlich die Pixelzahl und damit die maximal mögliche Druckgröße.',
  aperture: 'f0',
  focalLength: '20',
  shutterSpeed: '160',
  iso: '200',
  youTubeUrl: 'https://youtu.be/xZuCQPrUFlc',
  extraOne: '',
  extraTwo: '',
};

const placeDb = [placeData1, placeData2, placeData3, placeData4];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListView() {
  const classes = useStyles();

  return (
    <Container disableGutters={true}>
      <List className={classes.root}>
        <Grid container direction={'row'} justify={'center'}>
          <ListItem>
            <Grid item xs={12}>
              {placeDb.map((placeData) => (
                <ListCards
                  key={placeData.id}
                  type={placeData.type}
                  title={placeData.title}
                  street={placeData.street}
                  primaryPicture={placeData.primaryPictureUrl}
                />
              ))}
            </Grid>
          </ListItem>
        </Grid>
      </List>
    </Container>
  );
}
