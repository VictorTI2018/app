import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/AntDesign'
import {
    FotoPet,
    SelectedChat,
    ContainerPetChat,
    List,
    NomePetChat,
    ContainerDadosChat
} from './styles'

import _ from 'lodash'

import { getAmigos, getMeets } from '../../webservice/contatos'

import theme from '../../theme'

import styles from './styles'

function Contatos(props) {

    const tipo = props.navigation.getParam('tipo')
    const pet = props.usuario.pets

    const [loading, setLoading] = useState(false)
    const [amigos, setAmigos] = useState([])
    const [meet, setMeet] = useState([])

    function selectedItem(item) {
        props.navigation.push('ChatAmizade', { model: item, pet: pet, situacao: tipo })
    }


    async function loadAmigos(id_pet) {
        try {
            setLoading(true)
            const resp = await getAmigos(id_pet)
            setAmigos(resp.data)
        } finally {
            setLoading(false)
        }
    }

    async function loadMeets(id_pet) {
        try {
            setLoading(true)
            const resp = await getMeets(id_pet)
            setMeet(resp.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let { id_pet } = pet
        if (id_pet > 0) {
            if (tipo === true) {
                loadAmigos(id_pet)
            } else if(tipo === false) {
                loadMeets(id_pet)
            }

        }
    }, [tipo])

    function renderTopo() {
        return (
            <View style={{ backgroundColor: '#546E7A', height: 80, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                    <Image source={{ uri: pet.imagem }} style={{ height: 65, width: 65, borderRadius: 65 }} />
                </View>
                <View style={{ alignItems: 'flex-end', marginLeft: 100 }}>
                    <Text style={{ color: '#FFF', fontSize: 24 }}>{pet.nome}</Text>
                </View>
            </View >
        )
    }
    let iconCor = tipo === true ? {  backgroundColor: theme.colors.primary  } : { backgroundColor: theme.colors.errors}
    function renderRow({ item }) {
        const data = item
        return (
            <SelectedChat onPress={() => { selectedItem(data) }}>
                <ContainerPetChat>
                    <FotoPet source={{ uri: data.imagem }} />
                    <ContainerDadosChat>
                        <NomePetChat>{data.nome}</NomePetChat>
                        <View style={[styles.containerIcon, iconCor]}>
                            {tipo ? <Icon name="pets" size={20} color="#FFF" /> : <Iconn name="heart" size={20} color="#FFF" />}
                        </View>
                    </ContainerDadosChat>
                </ContainerPetChat>

            </SelectedChat>
        )
    }


    function renderListAmizade() {
        return (
            <>
                <List renderItem={renderRow}
                    data={tipo === true ? amigos : meet}
                    keyExtractor={item => String(item.id_pet)}
                />
            </>

        )
    }



    return (
        <>
            {renderTopo()}
            {renderListAmizade()}
        </>
    )
}

const mapStateToProps = ({ usuario }) => {
    return {
        usuario: usuario
    }
}

export default connect(mapStateToProps, null)(Contatos)