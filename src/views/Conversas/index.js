import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { Badge } from 'react-native-elements'
import { connect } from 'react-redux'
import { conversasPetFetch } from '../../store/listaConversas/actions'
import _ from 'lodash'

import { SelectedChat, ContainerPetChat, NomeDonoPet } from './styles'

function Conversas(props) {

    const pet = props.usuario.pets

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        props.conversasPetFetch(pet)
    }, [])

    useEffect(() => {
        criarFonteDados(props.conversas)
    }, [props.conversas])

    function criarFonteDados(conversas) {
        setDataSource(conversas)
    }
    function selectedItem(item) {
        props.navigation.push('ChatAmizade', { model: item, pet: pet })
    }

    function renderRow({ item }) {
        return (
            <SelectedChat onPress={() => selectedItem(item)}>
                <ContainerPetChat>

                    <Image source={{ uri: item.imagem }} style={{ height: 65, width: 65, borderRadius: 65 }} />
                    <NomeDonoPet>{item.nome}</NomeDonoPet>

                </ContainerPetChat>
                <Badge value={props.conversa.length} status="success" />
            </SelectedChat>
        )
    }

    function renderLista() {
        return (
            <FlatList data={dataSource}
                renderItem={renderRow}
                keyExtractor={item => String(item.uid)}
            />
        )
    }
    return (
        <>
            {dataSource.length ? renderLista() : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Não há mensagens no momento!</Text>
                </View>
            )}
        </>
    )
}

const mapStateToProps = ({ usuario, listas, lista }) => {

    const conversas = _.map(listas, (val, uid) => {
        return { ...val, uid }
    })

    const conversa = _.map(lista, (val, uid) => {
        return { ...val, uid }
    })

    return {
        conversas,
        conversa,
        usuario
    }
}

export default connect(mapStateToProps, { conversasPetFetch })(Conversas)