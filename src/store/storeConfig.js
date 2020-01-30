import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import userReducer from './user/reducer'
import navigationReducer from './navigation/reducer'
import mensagemReducer from './chat/reducer'
import listaConversa from './listaConversa/reducer'

const reducers = combineReducers({
    usuario: userReducer,
    navigation: navigationReducer,
    mensagem: mensagemReducer,
    lista: listaConversa,
})

export const storeConfig = () => {
    return createStore(reducers, {}, applyMiddleware(ReduxThunk))
}

export default storeConfig

