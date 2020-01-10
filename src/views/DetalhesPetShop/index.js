import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { get } from 'lodash'

import {
    Container,
    ContainerTopo,
    ImageAbsolute,
    ImagePequena,
    Title,
    ContainerTitle,
    ContainerDescricao,
    Descricao,
    TitleDescricao,
    ContainerDados,
    Texto,
    Dados,
    ContainerEndereco,
    TextEndereco,
    Anchor,
    Submit
} from './styles'

import { getPetShop } from '../../webservice/petshops'
import theme from '../../theme'

export default function DetalhesPetShop({ navigation }) {

    const [model] = useState(navigation.getParam('petshop'))

    const [loading, setLoading] = useState(false)


    function renderFoto() {
        return (
            <ContainerTopo>
                <ImageAbsolute source={require('../../assets/petshop.png')} />
                <View >
                    <ImagePequena source={require('../../assets/cachorro1.png')} />
                </View>
            </ContainerTopo>
        )
    }


    function renderDados() {
        const nome = model.nome
        const telefone = model.telefone
        const celular = model.celular
        const logradouro = model.logradouro
        const numero = model.numero
        const bairro = model.bairro
        return (
            <>
                <ContainerTitle>
                    <Title>{nome || ''}</Title>
                </ContainerTitle>

                <ContainerDescricao>
                    {descricao.map(item => {
                        return (
                            <Descricao key={item.id_descricao_locais}>
                                <TitleDescricao>{item.descricao}</TitleDescricao>
                            </Descricao>
                        )
                    })}

                </ContainerDescricao>

                <ContainerDados>
                    <Texto>Telefone: </Texto>
                    <Dados>{telefone || ''}</Dados>
                </ContainerDados>
                <ContainerDados>
                    <Texto>WhatsApp: </Texto>
                    <Dados>{celular || ''}</Dados>
                </ContainerDados>
                <ContainerEndereco>
                    <TextEndereco>{logradouro || ''}, {numero || 0}</TextEndereco>
                    <TextEndereco>{bairro || ''}</TextEndereco>
                    {/* <TextEndereco>{cidade[0].cidade || ''} - {cidade[0].uf || ''}</TextEndereco> */}
                </ContainerEndereco>
            </>
        )
    }

    return (
        <Container>
            {renderFoto()}
            {loading ? <ActivityIndicator size="large" color={theme.colors.primary} />
                : renderDados()}
            <Anchor>www.vetcenter.com.br</Anchor>
            <Submit>Galeria de Fotos</Submit>
        </Container>
    )
}

