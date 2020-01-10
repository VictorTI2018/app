import React from 'react'
import { Topo } from '../../components'

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

const dados = [
    { id_pet: 1, nome: 'Victor', nomePet: 'Bryan' },
    { id_pet: 2, nome: 'Cibele', nomePet: 'Totozinho' },
    { id_pet: 3, nome: 'Debora', nomePet: 'Lilika' }
]

export default function Chat({ navigation }) {


    function selectedItem(item) {
        navigation.push('ChatAmizade', { model: item })
    }

    function renderTopo() {
        return (
            <ContainerTopo>
                <Container>
                    <FotoPet source={require('../../assets/cachorro1.png')} />
                </Container>
                <Container>
                    <NomePet>Totozinho</NomePet>
                </Container>
            </ContainerTopo>
        )
    }

    function renderListaChat(item) {
        const data = get(item, 'item')
        return (
            <SelectedChat onPress={ () => {selectedItem(data)}}>
                <ContainerPetChat>
                    <FotoPet  source={require('../../assets/cachorro1.png')} />
                    <ContainerDadosChat>
                        <NomePetChat>{data.nomePet}</NomePetChat>
                        <NomeDonoPet>Dono(a): {data.nome}</NomeDonoPet>
                    </ContainerDadosChat>
                </ContainerPetChat>
                <ContainerNotification>
                        <TextNotification>1</TextNotification>
                    </ContainerNotification>
            </SelectedChat>
        )
    }

    function actionBack() {
        navigation.pop()
    }


    return (
        <>
        <Topo  title="Lista de Contatos"  iconBack iconName="md-arrow-back"   perfil onPress={actionBack} />
            {renderTopo()}
            <List renderItem={renderListaChat}
                data={dados}
                keyExtractor={item => String(item.id_pet)}
            />
        </>
    )
}