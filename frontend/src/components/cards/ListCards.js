import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import michel from '../../images/michel.jpg'
import Avatar from "@material-ui/core/Avatar";
import ArchitectureIcon from "./avatarIcons/ArchitectureIcon";
import CardHeader from "@material-ui/core/CardHeader";
import PlacesDb from "../PlacesDb";

const useStyles = makeStyles({

    media: {
        width: '100vw',
        height: props => 100 * props.ratio,
    },
});

export default function MediaCard(places) {
    const classes = useStyles({ratio: 1.778});

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label={places.type} className={classes.avatar}>
                        <ArchitectureIcon/>
                    </Avatar>
                }

                title="{places.title}"
                subheader="{places.street}"
            />
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={places.primaryPictureUrl}
                    title={places.title}
                />
            </CardActionArea>

        </Card>
    );
}
