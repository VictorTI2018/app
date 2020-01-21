import { createStore, combineReducers } from 'redux'
import userReducer from './user/reducer'
import navigationReducer from './navigation/reducer'

const reducers = combineReducers({
    user: userReducer,
    navigation: navigationReducer
})

export const storeConfig = () => {
    return createStore(reducers)
}

