import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from 'react-native-push-notification'
import { modificaMensagem, enviarMensagem, conversaPetFetch } from '../../store/chat/actions'
import { View, TextInput, FlatList, Text, Image } from 'react-native'
import _ from 'lodash'

import { Button } from 'react-native-elements'

import styles from './styles'

function ChatItem(props) {

    const [dataSource, setDataSource] = useState()
    const situacao = props.navigation.getParam('tipo')

    const { pets } = props.usuario
    useEffect(() => {
        const amigo = props.navigation.getParam('model')
        const pet = pets
        let model = {
            amigo,
            pet
        }
        props.conversaPetFetch(model)
        criarFonteDados(props.conversa)
    }, [])

    useEffect(() => {
        criarFonteDados(props.conversa)
    }, [props.conversa])



    function _enviarMensagem() {
        const amigo_pet = props.navigation.getParam('model')
        const pet = pets
        const { mensagem } = props
        const model = {
            amigo_pet,
            mensagem,
            pet
        }

        props.enviarMensagem(model)
        for(let value of dataSource) {
            if(value.tipo === "e")  {
                notificarMensagem()
            } else {
                notificarMensagem()
            }
        }
    }


    function notificarMensagem() {
        const amigo = props.navigation.getParam('model')
        const { id_pet } = amigo
        Notification.localNotification({
            title: "Notificação PetMeet", // (optional)
            message: props.mensagem, // (required)
            userInfo: id_pet
        })
    }

    function criarFonteDados(conversa) {
        setDataSource(conversa)
    }



    function renderRow({ item }) {
        const mensagem = _.get(item, 'mensagem.mensagem')
        const tipo = _.get(item, 'tipo')
        const imagem = _.get(item, 'imagem')
        if (tipo === 'e') {
            return (
                <View style={styles.mensagemLeft}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textMensagem}>{mensagem}</Text>
                        <Image source={{ uri: imagem }} style={{ height: 30, width: 30, borderRadius: 60 }} />

                    </View>

                </View>
            )
        } else {
            return (
                <View style={styles.mensagemRigth}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textMensagemRigth}>{mensagem}</Text>
                        <Image source={{ uri: imagem }} style={{ height: 30, width: 30, borderRadius: 60 }} />
                    </View>

                </View>
            )
        }

    }

    let backGround = situacao ? { backgroundColor: '#BBDEFB' } : { backgroundColor: '#E57373' }
    return (
        <View style={[styles.container, backGround]}>
            <View style={styles.listContainer}>
                <FlatList data={dataSource}
                    renderItem={renderRow}
                    keyExtractor={item => String(item.uid)}
                />
            </View>
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

const mapStateToProps = ({ mensagem, lista, usuario }) => {
    const conversa = _.map(lista, (val, uid) => {

        return { ...val, uid }
    })
    return {
        conversa,
        mensagem: mensagem,
        usuario
    }
}



export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaPetFetch })(ChatItem)