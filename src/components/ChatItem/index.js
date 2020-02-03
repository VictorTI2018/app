import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { modificaMensagem, enviarMensagem, conversaPetFetch } from '../../store/chat/actions'
import { View, TextInput, FlatList, Text } from 'react-native'
import _ from 'lodash'

import { Button } from 'react-native-elements'

import styles from './styles'

function ChatItem(props) {

    const [dataSource, setDataSource] = useState()
    const situacao = props.navigation.getParam('situacao')

    useEffect(() => {
        const amigo = props.navigation.getParam('model')
        const pet = props.navigation.getParam('pet')
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
        const pet = props.navigation.getParam('pet')
        const { mensagem } = props
        const model = {
            amigo_pet,
            mensagem,
            pet
        }
        props.enviarMensagem(model)
    }

    function criarFonteDados(conversa) {
        setDataSource(conversa)
    }



    function renderRow({ item }) {
        const mensagem = _.get(item, 'mensagem.mensagem')
        const tipo = _.get(item, 'tipo')
        if (tipo === 'e') {
            return (
                <View style={styles.mensagemLeft}>
                    <Text style={styles.textMensagem}>{mensagem}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.mensagemRigth}>
                    <Text style={styles.textMensagemRigth}>{mensagem}</Text>
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

const mapStateToProps = ({ mensagem, lista }) => {
    const conversa = _.map(lista, (val, uid) => {

        return { ...val, uid }
    })

    return {
        conversa,
        mensagem: mensagem
    }
}



export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaPetFetch })(ChatItem)