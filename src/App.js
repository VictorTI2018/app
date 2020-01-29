import React, { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import { Navigator } from './navigation/Navigation'
import { NetInfo } from './components'
import storeConfig from '../src/store/storeConfig'
import firebase from 'firebase'

const store = storeConfig()

export default function App() {

    function loadFireBase() {
        let config = {
            apiKey: "AIzaSyAC2aw8ySqVwiYMTUHAHxyQnMPSyY3gfdA",
            authDomain: "petmeet-e4a58.firebaseapp.com",
            databaseURL: "https://petmeet-e4a58.firebaseio.com",
            projectId: "petmeet-e4a58",
            storageBucket: "petmeet-e4a58.appspot.com",
            messagingSenderId: "888925741556",
            appId: "1:888925741556:web:81a221a0303aacab01d9a1",
            measurementId: "G-MZFHBEK0FE"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }
    useEffect(() => {
        loadFireBase()
    }, [])
    return (
        <Provider store={store}>
            <NetInfo>
                <Navigator />
                <FlashMessage position='bottom' />
            </NetInfo>
        </Provider>
    )
}