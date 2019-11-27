import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as actionTypes from '../store/actions'
import { connect } from 'react-redux';
import { register } from '../services/ApiService';
import Error from '../components/Errors/Errors';

const urlBase = window.location.origin;

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: '',
      showError: false
    }
  }

  updateField = async (field, input) => {
    await this.props.setRegField({ [field]: input });
  }


  async componentDidUpdate() {
    let { firstName, lastName, email, password } = this.props.register.userData;
    let { formReady } = this.props.register
    if (firstName && lastName && email && password && !formReady) {
      await this.props.updateState({ formReady: true })
    }
  }

  switchToLogin = async () => {
    await this.redirectUser(`${urlBase}/login/`);
  }

  registrationSubmit = async (event) => {
    event.preventDefault();
    let response = await register(this.props.register.userData)
    if (response && response.status === 200) {
      await this.setState({ errorMsg: '', showError: false });
      await this.saveToBrowserSession(response);
      await this.redirectUser(`${urlBase}/videos/`);
    } else {
      await this.setState({ errorMsg: response.error, showError: true });
    }
  }

  saveToBrowserSession = async (data) => {
    let session = window.sessionStorage
    session.setItem('token', data.token)
  }

  redirectUser = (target) => {
    window.location.href = target;
  }

  render() {
    return (
      <>
        <div>
          <Typography component="h1" variant="h5">
            Registration Page
        </Typography>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={this.props.register.userData.firstName}
                  onChange={(e) => this.updateField('firstName', e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={this.props.register.userData.lastName}
                  onChange={(e) => this.updateField('lastName', e.target.value)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.props.register.userData.email}
                  onChange={(e) => this.updateField('email', e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={this.props.register.userData.password}
                  onChange={(e) => this.updateField('password', e.target.value)}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.registrationSubmit}
              disabled={!this.props.register.formReady}
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link onClick={this.switchToLogin} variant="body2">
                  Already have an account? Sign in!
              </Link>
              </Grid>
            </Grid>
            {this.state.showError &&
              <Grid item xs={12} sm={6}>
                <Error errMsg={this.state.errorMsg} />
              </Grid>}
          </form>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    register: state.register,
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (data) => dispatch({ type: actionTypes.UPDATE_STATE, payload: data }),
    setRegField: (data) => dispatch({ type: actionTypes.SET_REGISTRATION_DATA, payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);