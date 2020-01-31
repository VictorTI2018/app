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

const dados = [
    { id_pet: 1, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 2, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 3, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 4, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 5, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
]

import theme from '../../theme'

function Contatos(props) {

    const tipo = props.navigation.getParam('tipo')
    const pet = props.usuario.pets

    const [loading, setLoading] = useState(false)
    const [petFfriend, setPetFriend] = useState([])
    const [petmeet, setPetMeet] = useState([])

    function selectedItem(item) {
        props.navigation.push('ChatAmizade', { model: item, pet: pet })
    }



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

    function renderRow(item) {
        const data = item
        return (
            <SelectedChat onPress={() => { selectedItem(data) }}>
                <ContainerPetChat>
                    <FotoPet source={data.imagem} />
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
            <List renderItem={renderRow}
                data={dados}
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

export default connect(mapStateToProps, null)(Contatos)