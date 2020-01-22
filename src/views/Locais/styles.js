import { StyleSheet } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { Text } from 'native-base'

import { Button } from '../../components'

import theme from '../../theme'

const SubmitButton = styled(Button)`
    background: ${props => props.colors ? props.colors : theme.colors.errors};
    height: 25px;
    width: 180px;
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



export default StyleSheet.create({
    container: {
        height: 'auto',
        marginTop: 40,
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        borderColor: '#222',
        flexDirection: 'row',
        padding: 10
    },
    topo: {
        height: 50,
        width: '100%',
        backgroundColor: '#0D47A1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginBottom: 5,
        height: 150,
        width: 130,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    containerDescription: {
        paddingLeft: 20,
        paddingRight: 40,
        width: '80%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25
    },
    endereco: {
        marginTop: 6,
        fontSize: 15
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    }
})