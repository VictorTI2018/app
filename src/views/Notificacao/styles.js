import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'


export const ContainerTopo = styled.View`
    background-color: #546E7A;
    flex-direction: row;
    height: 80px;
    align-items: center;
`

export const Container = styled.View`
    text-align: center;
`

export const NomePet = styled.Text`
    color: #FFF;
    font-size: 24px;
    text-align: center;
`

export const FotoPet = styled.Image`
    border-radius: 50px;
    height: 65px;
    width: 65px;
`

const ContainerChat = styled.TouchableOpacity`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.primary};
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    height: 100px;
    
`

export const SelectedChat = props => {
    return (
        <ContainerChat {...props}>
            {props.children}
        </ContainerChat>
    )
}

export const ContainerPetChat = styled.View`
    margin-left: 10px;
    flex-direction: row;
    align-items: center;
`

export const ContainerNotification = styled.View`
    border-radius: 100px;
    height: 34px;
    width: 34px;
    background-color: #00C853;
`

export const TextNotification = styled.Text`
    color: #FFF;
    text-align: center;
    font-size: 22px;
`
export const List = styled.FlatList``;

export const NomePetChat = styled.Text`
    font-size: 23px;
    margin-left: 10px;
`;

export const ContainerDadosChat = styled.View``

export const NomeDonoPet = styled.Text`
    font-size: 15px;
    margin-left: 15px;
`
