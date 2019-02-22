import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoritesReducer'

export default createStore(toggleFavorite)