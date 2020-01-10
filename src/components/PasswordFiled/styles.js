import styled from 'styled-components'
import { Platform } from 'react-native'
import theme from '../../theme'

export const Container = styled.View`
    flex: 1;
    
`

export const ContainerInput = styled.View`
     position: relative;
    align-self: stretch;
    justify-content: center;
`

export const Input = styled.TextInput`
    align-self: stretch;
    border-width: 1px;
    border-radius: 20px;
    border-color: ${theme.colors.primary};
    padding-left: 25px;
`

export const Toucha = styled.TouchableOpacity`
    position: absolute;
    right: 3px;
    width: 35px;
    padding: 5px;
`