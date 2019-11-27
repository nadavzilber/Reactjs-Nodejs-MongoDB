import { createStore } from 'redux';
import RootReducer from './reducers/RootReducer';
export default function configureStore(initialState={}) {
 return createStore(
   RootReducer,
   initialState,
 );
}