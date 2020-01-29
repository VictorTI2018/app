import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native'

import {  TextField } from '../../components'
import ChatItem from '../../components/ChatItem'

const messages = {
    author: {
        id: 1,
        avatar: '',
        username: 'Victor Hugo'
    },
    author: {
        id: 2,
        avatar: '',
        username: 'Victor Hugo'
    },
    author: {
        id: 3,
        avatar: '',
        username: 'Victor Hugo'
    },
    author: {
        id: 4,
        avatar: '',
        username: 'Victor Hugo'
    }
}

const user = {
    id: 2,
    id: 3,
    id: 4,
    id: 5
}

export default function ChatMessages(props) {

    const [ loading, setLoading ] = useState(false)

    // let behavior = '';
    // if (Platform.OS == 'ios') {
    //     behavior = 'padding'
    // }
    // const extraBtnStyle = loading ? styles.disabledBtn : styles.enabledBtn;
    return (
        <ChatItem   />
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     inputBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 5,
//         paddingVertical: 10,
//         backgroundColor: '#dadfea'
//     },
//     textBox: {
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: 'gray',
//         fontSize: 14,
//         paddingHorizontal: 10,
//         flex: 1,
//         paddingVertical: 5,
//         marginLeft: 5
//     },
//     sendBtn: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingLeft: 15,
//         paddingRight: 15,
//         borderRadius: 5,
//         marginLeft: 5
//     },
//     enabledBtn: {
//         backgroundColor: '#476DC5'
//     },
//     disabledBtn: {
//         backgroundColor: '#89a9f4'
//     }
// })