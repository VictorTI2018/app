import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { modificaMensagem, enviarMensagem } from '../../store/chat/actions'
import { View, TextInput } from 'react-native'

import { Button } from 'react-native-elements'

import styles from './styles'

function ChatItem(props) {

    function _enviarMensagem() {
        const { usuario, nome, id_pet } = props.navigation.getParam('model')
        const pet = props.navigation.getParam('pet')
        const { mensagem } = props
        const model =  {
            usuario,
            nome,
            id_pet,
            mensagem,
            pet
        }
        props.enviarMensagem(model)
    }

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}></View>
            <View style={styles.sendContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    value={props.mensagem}
                    onChangeText={texto => props.modificaMensagem(texto)} />

                <Button title="Enviar"
                    buttonStyle={{ borderRadius: 10, height: 50 }}
                    onPress={_enviarMensagem} />
            </View>
        </View>
    )
}

const mapStateToProps = ({ mensagem }) => {
    return {
        mensagem: mensagem
    }
}



export default connect(mapStateToProps, { modificaMensagem, enviarMensagem })(ChatItem)