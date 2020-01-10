import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native'

import { ChatItem, TextField } from '../../components'

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

export default function ChatMessages({ navigation }) {

    // const [model, setModel ] = useState()

    const [ loading ] = useState(false)

    // useEffect(() => {
    //     let data = navigation.params('model')
    //     setModel(data)
    // }, [model])
    let behavior = '';
    if (Platform.OS == 'ios') {
        behavior = 'padding'
    }
    const extraBtnStyle = loading ? styles.disabledBtn : styles.enabledBtn;
    return (
        <View style={styles.container}>
            <ChatItem   />

            <KeyboardAvoidingView behavior={behavior}>
                <View style={styles.inputBar}>

                    <TextInput
                        style={styles.textBox}
                        multiline
                    />

                    <TouchableHighlight
                        style={[styles.sendBtn, extraBtnStyle]}
                        disabled={loading}
                    >
                        <Text style={{ color: '#fff' }}>Send</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#dadfea'
    },
    textBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 14,
        paddingHorizontal: 10,
        flex: 1,
        paddingVertical: 5,
        marginLeft: 5
    },
    sendBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginLeft: 5
    },
    enabledBtn: {
        backgroundColor: '#476DC5'
    },
    disabledBtn: {
        backgroundColor: '#89a9f4'
    }
})