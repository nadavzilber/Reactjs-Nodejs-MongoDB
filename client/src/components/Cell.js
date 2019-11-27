import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Cell(props) {
    const classes = useStyles();

    const videoClicked = async () => {
        await props.openVideo(props.vid)
    }

    return (
        <Paper className={classes.paper} onClick={() => videoClicked()}>
            {props.vid}
        </Paper>
    )
}