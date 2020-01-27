import { createStore, combineReducers } from 'redux'
import userReducer from './user/reducer'
import navigationReducer from './navigation/reducer'

const reducers = combineReducers({
    usuario: userReducer,
    navigation: navigationReducer
})

export const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig

