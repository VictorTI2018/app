import { SET_DRAWER_LOCKED, SET_STACK_COUNT } from './types'

export const setDrawerLocked = (drawerLocked) => ({
    type: SET_DRAWER_LOCKED,
    drawerLocked
})

export const setStackCount = (stackCount) => ({
    type: SET_STACK_COUNT,
    stackCount
})