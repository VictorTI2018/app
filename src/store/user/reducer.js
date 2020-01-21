import * as t from './types'
import Reducer from '../reducer'

const initialState = {
    usuario: null
}

export default(state = initialState, action) => {
    const r = new Reducer(state, action)

    switch(action.type) {
        case t.SET_API_TOKEN:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    token: action.token
                }
            }
        case t.SET_USUARIO: return r.set('usuario')
        default:
            return state
    }
}