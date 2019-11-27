import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Cell from './Cell';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(2)
    },
}));

export default function VideoGrid(props) {

    const classes = useStyles();

    const openClickedVideo = async (video) => {
        await props.updateState({ 'stream': video })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {props.videos.map((vid, index) => {
                    return (
                        <Grid key={index} item xs className={classes.paper}>
                            <Cell key={index} vid={vid} openVideo={() => openClickedVideo(vid)} />
                        </Grid>)
                })}
            </Grid>
        </div>
    );
}