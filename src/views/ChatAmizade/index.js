import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { View, TouchableOpacity, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

import ChatItem from '../../components/ChatItem'


export default function ChatMessages(props) {
    const [loading, setLoading] = useState(false)
    const amigo = props.navigation.getParam('model')

    function actionBack() {
        props.navigation.goBack()
    }

    return (
        <>
            <View style={{ height: 60, backgroundColor: '#0D47A1', flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <TouchableOpacity onPress={actionBack}>
                        <Icon name="chevron-thin-left" size={50} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 100, flexDirection: 'row', flexBasis: '30%' }}>
                    <Avatar source={{ uri: amigo.imagem }} rounded />
                    <View>
                    <Text style={{ color: 'white' }}>Amizade com </Text>
                    <Text style={{ color: 'white' }}>{amigo.nome}</Text>
                    </View>
                </View>
            </View>
            <ChatItem {...props} />
        </>
    )
}

