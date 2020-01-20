import { combineReducers, createStore } from 'redux'
import user from './user/reducer'
import navigation from './navigation/reducer'

const routeReducer = combineReducers({ user, navigation })
export const store = createStore(routeReducer)