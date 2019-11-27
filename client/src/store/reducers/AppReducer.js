import * as actionTypes from '../actions'

const initialState = {
  pageReady: false,
  userVideos: [],
  pendingVideo: '',
  stream: ''
}

let payload = {}

const AppReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {

    case actionTypes.UPDATE_STATE:
      payload = Object.entries(action.payload)
      payload.map((object) => {
        newState[object[0]] = object[1]
      })
      return newState;

    case actionTypes.SET_VIDEOS:
      newState.userVideos = [...newState.userVideos, ...action.videos.videos]
      return newState;

    case actionTypes.ADD_VIDEO:
      newState.pendingVideo = '';
      return {
        ...newState,
        userVideos: [...newState.userVideos, action.video.video]
      }

    default: return newState;
  }
}

export default AppReducer