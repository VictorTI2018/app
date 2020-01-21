// import * as ty from './types'
// import { useReducer } from '../reducer'

// const initialState = {
//     drawerLocked: false,
//     stackCount: 0
// }

// export default (state = initialState, action) => {
//     const r = useReducer(state, action)
//     switch(action.type) {
//         case ty.SET_DRAWER_LOCKED: return r.set('drawerLocked')
//         case ty.SET_STACK_COUNT: return r.set('stackCount')
//         default: 
//               return state
//     }
// }