import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as actionTypes from '../store/actions'
import { connect } from 'react-redux';
import { login } from '../services/ApiService';
import Error from '../components/Errors/Errors';

const urlBase = window.location.origin;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: '',
      showError: false
    }
  }

  async componentDidUpdate() {
    let { email, password } = this.props.login.userData;
    let { formReady } = this.props.login;
    if (email && password && !formReady) {
      await this.props.updateState({ formReady: true })
    }
  }

  updateField = async (field, value) => {
    await this.props.setLoginField({ [field]: value })
  }

  switchToRegistration = async () => {
    this.redirectUser(`${urlBase}/registration/`);
  }

  loginSubmit = async (event) => {
    event.preventDefault();
    const response = await login(this.props.login.userData)
    if (response && response.status === 200) {
      await this.setState({ errorMsg: '', showError: false });
      await this.saveToBrowserSession(response.token);
      this.redirectUser(`${urlBase}/videos/`);
    } else {
      await this.setState({ errorMsg: response.error, showError: true });
    }
  }

  redirectUser = (target) => {
    window.location.href = target;
  }

  saveToBrowserSession = async (token) => {
    let session = window.sessionStorage
    session.setItem('token', token)
  }

  render() {
    return (
      <>
        <Typography component="h1" variant="h5">
          Login Page
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.props.login.userData.email}
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
                value={this.props.login.userData.password}
                onChange={(e) => this.updateField('password', e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            className="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.loginSubmit}
            disabled={!this.props.login.formReady}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={this.switchToRegistration} variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
          {this.state.showError &&
            <Grid item xs={12} sm={6}>
              <Error errMsg={this.state.errorMsg} />
            </Grid>}
        </form>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (data) => dispatch({ type: actionTypes.UPDATE_STATE, payload: data }),
    setLoginField: (data) => dispatch({ type: actionTypes.SET_LOGIN_DATA, payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);