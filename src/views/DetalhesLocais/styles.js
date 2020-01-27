import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, Text } from 'react-native'

import { Button } from '../../components'
import theme from '../../theme'


export const Container = styled.ScrollView`
    flex: 1;
`


export const ContainerTopo = styled.View`
    
`

export const ImageAbsolute = styled.Image`
    width: 100%;
    height: 150;
`

export const ImagePequena = styled.Image`
    width: 120;
    height: 120;
    left: 140;
    top: -80px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${theme.colors.primary};
`

export const Title = styled.Text`
    text-align: center;
    font-size: 35px;
    font-weight: bold;
`
export const ContainerTitle = styled.View`
    top: -70px;
`

export const ContainerDescricao = styled.View`
    top: -50px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 5px;
`

export const Descricao = styled.View`
    flex-basis: 25%;
    border-radius: 10px;
    height: auto;
    background-color: #ECEFF1;
    margin: 5px;
`

export const TitleDescricao = styled.Text`
    font-size: 16px;
    text-align: center;
`

export const ContainerDados = styled.View`
    flex-direction: column;
    top: -20px;
    margin-bottom: 15px;
`

export const Texto = styled.Text`
    font-size:16px;
    text-align: center;
`

export const Dados = styled.Text`
    font-size: 35px;
    font-weight: bold;
    text-align: center;
`

export const ContainerEndereco = styled.View`
    flex-direction: column;
`

export const TextEndereco = styled.Text`
    top: -10px;
    font-size: 23px;
    text-align: center;
    font-weight: 300;
`

const Link = styled(TouchableOpacity)`
    margin-bottom: 10px;
    margin-top: 10px;
    
`

const LinkText = styled(Text)`
    color:#01579B;
    font-size: 18px;
    text-align: center;
    text-decoration: underline;
    text-decoration-color: #01579B;
`

export const Anchor = props => {
    return (
        <Link {...props}>
            <LinkText>{props.children}</LinkText>
        </Link>
    )
}

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




