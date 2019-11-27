import { combineReducers } from 'redux';
import AppReducer from './AppReducer'
import LoginReducer from './LoginReducer'
import RegistrationReducer from './RegistrationReducer'

export default combineReducers({
    app: AppReducer,
    login: LoginReducer,
    register: RegistrationReducer,
});