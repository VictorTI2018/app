import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import { conversasPetFetch } from '../../store/listaConversas/actions'
import _ from 'lodash'

import { SelectedChat, ContainerPetChat, ContainerNotification, TextNotification, NomeDonoPet } from './styles'

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

    function renderRow({ item }) {
        return (
            <SelectedChat >
                <ContainerPetChat>

                <Image source={{ uri: item.imagem }} style={{ height: 65, width: 65, borderRadius: 65 }} />
                        <NomeDonoPet>{item.nome}</NomeDonoPet>
                    
                </ContainerPetChat>
                <ContainerNotification>
                    <TextNotification>1</TextNotification>
                </ContainerNotification>
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

    console.log()
    return (
        <>

            {renderLista()}
        </>
    )
}

const mapStateToProps = ({ usuario, listas }) => {

    const conversas = _.map(listas, (val, uid) => {
        return { ...val, uid }
    })
    return {
        conversas,
        usuario
    }
}

export default connect(mapStateToProps, { conversasPetFetch })(Conversas)