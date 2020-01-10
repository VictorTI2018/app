import store from '../store'
import { includes } from 'lodash'

export * from './rules'
export * from './storage'

export const unmask = v => {
    if (!v) {
      return ''
    }
    return v.replace(/[^\d]+/g, '')
  }
  

export const hex2rgba = ( hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getProps() {
  const state = store.getState()
  return {
    drawerLocked: state.navigation.drawerLocked
  }
}

export function isDrawerLocker(props) {
  return includes(props, true)
}