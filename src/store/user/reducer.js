import { useReducer } from '../reducer'
import { SET_NAME } from './types'

const initialState = {
    name: null
}

export default function (state = initialState, action) {
    const { type } = action
    const { set } = useReducer(state, action)
    if(type === SET_NAME ) { return set('name') }
    return false 
}