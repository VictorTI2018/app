import React, { useState, useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import { Navigator } from './navigation/Navigation'
import MainStack from './navigation/MainStack'
import { NetInfo } from './components'
import AsyncStorage from '@react-native-community/async-storage'

import { store } from './store'

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