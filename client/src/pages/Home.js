import React, { Component } from 'react';
import AddVideoPanel from '../components/TextField';
import { getVideos, addVideo } from '../services/ApiService';
import VideoGrid from '../components/VideoGrid'
import ReactPlayer from 'react-player';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Error from '../components/Errors/Errors';
import './Home.css'

const urlBase = window.location.origin;

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMsg: '',
            showError: false
        }
    }

    async componentWillMount() {
        const token = window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : null
        if (token) {
            const response = await getVideos(token);
            await this.props.setVideos({ videos: response.videos })
        } else {
            this.redirectUser(`${urlBase}/login/`);
        }
    }

    redirectUser = (target) => {
        window.location.href = target;
    }

    addURL = async (url) => {
        const token = window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : null
        const response = await addVideo(url, token);
        if (response && response.status === 200) {
            await this.setState({ errorMsg: '', showError: false });
            await this.props.addVideo({ video: response.url })
        } else {
            await this.setState({ errorMsg: response.error, showError: true });
        }
    }

    logout = async () => {
        sessionStorage.removeItem('token');
        this.redirectUser(`${urlBase}/login/`);
    }

    render() {
        return (
            <div className='Home'>
                <Typography component="h1" variant="h5">
                    Home Page
                </Typography>
                <Button
                    className="button"
                    variant="contained"
                    color="secondary"
                    onClick={(event) => this.logout(event)}
                >
                    Logout
                </Button>

                {this.props.app.stream &&
                    <ReactPlayer className='videoPlayer' url={this.props.app.stream} playing />
                }

                {this.state.showError &&
                    <Error errMsg={this.state.errorMsg} />}

                <AddVideoPanel
                    label='Enter URL'
                    addValue={this.addURL}
                />

                {this.props.userVideos &&
                    <VideoGrid videos={this.props.userVideos} updateState={this.props.updateState} />}
            </div >
        )
    }
}

export default Home;