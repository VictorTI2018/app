import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'


import {
    ContainerTopo,
    Container,
    NomePet,
    FotoPet,
    SelectedChat,
    ContainerNotification,
    ContainerPetChat,
    TextNotification,
    List,
    NomePetChat,
    ContainerDadosChat,
    NomeDonoPet
} from './styles'

import { get } from 'lodash'

import { listFriendPet } from '../../webservice/amizade'


const dados = [
    { id_pet: 1, nome: 'Victor', nomePet: 'Bryan' },
    { id_pet: 2, nome: 'Cibele', nomePet: 'Totozinho' },
    { id_pet: 3, nome: 'Debora', nomePet: 'Lilika' }
]

function Chat(props) {


    const pet = props.usuario.pets

    const [ loading, setLoading ] = useState(false)
    const [ petFfriend, setPetFriend ] = useState([])

    function selectedItem(item) {
        props.navigation.push('ChatAmizade', { model: item })
    }


 


    function renderTopo() {
        return (
            <ContainerTopo>
                <FotoPet source={require('../../assets/cachorro1.png')} />
                <Container>
                    <NomePet>{pet.nome}</NomePet>
                </Container>
            </ContainerTopo>
        )
    }

    function renderListaChat(item) {
       const data = get(item, 'item')
       console.log(data)
        return (
            <SelectedChat onPress={ () => {selectedItem(data)}}>
                <ContainerPetChat>
                    <FotoPet  source={require('../../assets/cachorro1.png')} />
                    <ContainerDadosChat>
                        <NomePetChat>{data.nome}</NomePetChat>
                        <NomeDonoPet>Dono(a): </NomeDonoPet>
                    </ContainerDadosChat>
                </ContainerPetChat>
                <ContainerNotification>
                        <TextNotification>1</TextNotification>
                    </ContainerNotification>
            </SelectedChat>
        )
    }

    function actionBack() {
        props.navigation.pop()
    }


    return (
        <>
            {renderTopo()}
            <List renderItem={renderListaChat}
                data={dados}
                keyExtractor={item => String(item.id_pet)}
            />
        </>
    )
}

const mapStateToProps = ({ usuario }) => {
    return {
        usuario: usuario
    }
}

export default connect(mapStateToProps, null)(Chat)