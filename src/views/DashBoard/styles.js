import React from 'react'
import styled from 'styled-components'
import { Text } from 'react-native'
import { Button } from '../../components'
import theme from '../../theme'


export const Container = styled.View`
    margin: 30px;
    flex: 1;
`

export const CardPet = styled.View`
    border-width: 1px;
    padding: 10px;
    border-radius: 20px;
    border-color: ${theme.colors.primary};
`

export const ContainerPet = styled.View`
    flex-direction: column;
`

export const ContainerIcon = styled.View`
    border-radius: 55px;
    background-color: ${props => props.color ? props.color : theme.colors.primary};
    height: 70px;
    width: 70px;
    justify-content: center;
    align-items: center;
`

const ContainerIconChat = styled.TouchableOpacity`
    border-radius: 55px;
    background-color: ${props => props.color ? props.color : theme.colors.primary};
    height: 70px;
    width: 70px;
    justify-content: center;
    align-items: center;
`

export const SubmitChat = props => {
    return (
        <ContainerIconChat {...props}>
            {props.children}
        </ContainerIconChat>
    )
}

export const ContainerCard = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 10px;
`

const FotoPet = styled.Image`
    border-radius: 50px;
    height: 100px;
    width: 100px;
`

export const ImagePet = props => {
    return (
        <FotoPet {...props} />
    )
}

export const NomePet = styled.Text`
    font-size: 23px;
    text-align: center;
    color: ${props => props.cor ? '#FFF' : '#000'};
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

export const ContainerCarosel = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`
export const ContainerPets = styled.View`
    border-radius: 20px;
    border-width: 1px;
    border-color: ${theme.colors.primary};
`
export const ContainerNome = styled.View`
    border-radius: 20px;
    width: 100%;
    background-color: ${theme.colors.primary};
`

const DetalhesButtonPet = styled.TouchableOpacity`
    background: ${props => props.colors ? props.colors : theme.colors.primary};
    border-radius: 20px;
    width: 100%;
    height: 30px;
`

const DetalhesTextPet = styled.Text`
    color: #FFF;
    font-size: 18px;
    text-align: center;
`

export const Detalhes = props => {
    return (
        <DetalhesButtonPet {...props} >
            <DetalhesTextPet>{props.children}</DetalhesTextPet>
        </DetalhesButtonPet>
    )
}

export const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 5px;
    margin: 5px;
`

export const FotoDono = styled.Image`
     border-radius: 50px;
    height: 100px;
    width: 100px;
`

export const ContainerDono = styled.View`
    flex-basis: 50%;
`

export const ViewRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.primary};
    margin: 2px 0 2px 0;
`

export const Row = styled.Text`
    font-size: 16px;
    color: ${theme.colors.placeholder};
`