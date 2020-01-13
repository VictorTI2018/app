import styled from 'styled-components'

import { StyleSheet } from 'react-native'
import theme from '../../theme'

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 3px;
    background-color: ${theme.colors.primary};
    justify-content: space-between;
`

export default StyleSheet.create({
    iconBack: {
  
    },
    colorIconBack: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.iconBack,
        borderRadius: 30,
    },
    iconMenu: {
        // paddingRight: 30
    },
    logo: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 14,
        color: theme.colors.title
    },
    caixa: {
        flexBasis: '33%'
    },
    imagem: {
        width: 150,
        height: 40,
    },
    profile: {
        padding: 10
    }
})