import React, { Component } from 'react';
import './App.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          {this.props.app &&
            <Router>
              <Switch>

                <Route path='/videos/'
                  render={(props) => <Home
                    {...props}
                    updateState={this.props.updateState}
                    userVideos={this.props.app.userVideos}
                    setVideos={this.props.setVideos}
                    addVideo={this.props.addVideo}
                    app={this.props.app} />}
                />

                <Route exact strict path='/'
                  render={(props) => <Registration {...props} />} />

                <Route path='/registration'
                  render={(props) => <Registration {...props} updateState={this.props.updateState} />} />

                <Route path='/login/'
                  render={(props) => <Login {...props} />} />

              </Switch>
            </Router>}

        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (data) => dispatch({ type: actionTypes.UPDATE_STATE, payload: data }),
    setVideos: (data) => dispatch({ type: actionTypes.SET_VIDEOS, videos: data }),
    addVideo: (data) => dispatch({ type: actionTypes.ADD_VIDEO, video: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);