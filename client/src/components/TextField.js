import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function AddVideoPanel(props) {

  const [value, setValue] = React.useState('')
  const classes = useStyles();

  const onValueChange = async (newValue) => {
    setValue(newValue)
  }

  const submitValue = async (event) => {
    event.preventDefault();
    props.addValue(value)
    setValue('')
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form className={classes.root} noValidate autoComplete="off">

          <TextField
            id="outlined-basic"
            label={props.label}
            type="search"
            className="textField"
            margin="normal"
            onChange={(e) => onValueChange(e.target.value)}
            value={value}
            variant="outlined"
          />

          <Button variant="contained" color="primary" className="button" onClick={submitValue}>
            Add URL
          </Button>

        </form>
      </Grid>
    </Grid>

  );
}