import {createStore, combineReducers} from 'redux';
import toggleFavorite from './Reducers/favoritesReducer'
import setAvatar from './Reducers/avatarReducer'

export default createStore(
    combineReducers({
        toggleFavorite,
        setAvatar
    })
)