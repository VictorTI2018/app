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

import { get } from 'lodash'

import { listFriendPet } from '../../webservice/amizade'
import { listMeetPet } from '../../webservice/petmeet'
import theme from '../../theme'

function Chat(props) {

    const tipo = props.navigation.getParam('tipo')
    const pet = props.usuario.pets

    const [loading, setLoading] = useState(false)
    const [petFfriend, setPetFriend] = useState([])
    const [ petmeet, setPetMeet ] = useState([])

    function selectedItem(item) {
        props.navigation.push('ChatAmizade', { model: item, pet: pet })
    }

    async function getFriends() {
        const resp = await listFriendPet(pet.id_pet)
        setPetFriend(resp.data)
    }

    async function getMeet() {
        const resp = await listMeetPet(pet.id_pet)
        setPetMeet(resp.data)
    }

    useEffect(() => {
        if(tipo === 'amizade') {
            getFriends()
        }
        if(tipo === 'meet') {
            getMeet()
        }
    }, [])

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

    function renderListaChat(item) {
        const data = get(item, 'item')
        return (
            <SelectedChat onPress={() => { selectedItem(data) }}>
                <ContainerPetChat>
                    <FotoPet source={{ uri: data.imagem }} />
                    <ContainerDadosChat>
                        <NomePetChat>{data.nome}</NomePetChat>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 200, height: 30, width: 30, backgroundColor: theme.colors.primary }}>
                            <Icon name="pets" size={20} color="#FFF" />
                        </View>
                    </ContainerDadosChat>
                </ContainerPetChat>

            </SelectedChat>
        )
    }

    function renderListAmizade() {
        return (
            <List renderItem={renderListaChat}
                data={petFfriend}
                keyExtractor={item => String(item.id_pet)}
            />
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

export default connect(mapStateToProps, null)(Chat)