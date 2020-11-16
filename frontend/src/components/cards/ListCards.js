import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import michel from '../../images/michel.jpg'
import Avatar from "@material-ui/core/Avatar";
import ArchitectureIcon from "./avatarIcons/ArchitectureIcon";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles({

    media: {
        height: 185,
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="architecture" className={classes.avatar}>
                        <ArchitectureIcon/>
                    </Avatar>
                }

                title="Der Michel"
                subheader="Englische Planke 1"
            />
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={michel}
                    title="Michel"
                />
            </CardActionArea>

        </Card>
    );
}
