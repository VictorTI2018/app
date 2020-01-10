import React from 'react'
import { Text } from 'native-base'
import styled from 'styled-components'

import { Button } from '../../components'

import theme from '../../theme'

export const Container = styled.ScrollView`
`
export const ContainerNome = styled.View`
    border-radius: 10px;
    width: 100%;
    height: 50;
    background-color: ${theme.colors.primary};
    align-items: center;
    justify-content: center;
`

export const CardPet = styled.View`
    border-width: 1px;
    margin: 20px;
    border-radius: 20px;
    border-color: ${theme.colors.primary};
`

export const NomePet = styled.Text`
    font-size: 33px;
    color: ${props => props.cor ? '#FFF' : '#000'};
`

export const NomeUsuario = styled.Text`
    font-size: 17px;
    color: #000;
`

export const ContainerFoto = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 10px;
`

export const FotoPet = styled.Image`
    width: 170;
    height: 170;
    border-radius: 200px;
`

export const ContainerMessagem = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Menssagem = styled.Text`
    font-size: 30px;
    color: ${theme.colors.errors};
`

export const SubMenssagem = styled.Text`
    font-size: 20px;
    color: ${theme.colors.errors};
`

export const ContainerUsuario = styled.View`
    margin: 20px 12px 40px 12px;
    flex-direction: row;
    align-items: center;
`
export const FotoUsuario = styled.Image`
    width: 100;
    height: 100;
    border-radius: 100px;
`

export const ContainerFotoUsuario = styled.View`
    justify-content: flex-end;
`

export const Detalhes = styled.Text`
    font-size: 17px;
`

export const ContainerDetalhes = styled.View`
    flex-direction: column;
    margin-left: 20px;
`

const SubmitButton = styled(Button)`
    background: ${props => props.colors ? props.colors : theme.colors.primary};
    margin: 0 15px 15px 15px;
    border-radius: 20px;
`

const SubmitText = styled(Text)`
    color: #FFF;
    font-size: 18;
`

export const Submit = props => {
    const { children } = props
    return (
        <SubmitButton {...props} full>
            <SubmitText>{children}</SubmitText>
        </SubmitButton>
    )
}