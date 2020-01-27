import React from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import { Navigator } from './navigation/Navigation'
import { NetInfo } from './components'
import storeConfig from '../src/store/storeConfig'

const store = storeConfig()

export default function App() {

    return (
        <Provider store={store}>
            <NetInfo>
                <Navigator />
                <FlashMessage position='bottom' />
            </NetInfo>
        </Provider>
    )
}