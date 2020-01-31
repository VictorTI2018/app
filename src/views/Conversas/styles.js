import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import theme from '../../theme'

export default StyleSheet.create({

})

const ContainerChat = styled.TouchableOpacity`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.primary};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
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

    flex-direction: row;
   
    align-items: center;
`
export const ContainerDadosChat = styled.View`
    flex-direction: row;
    align-items: center;
`

export const NomeDonoPet = styled.Text`
    font-size: 15px;
    margin-left: 15px;
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
