import React from 'react'
import { Text } from 'native-base'
import styled from 'styled-components'
import { Button } from '../../components'

import theme from '../../theme'

const SubmitButton = styled(Button)`
    background: ${props => props.colors ? props.colors : '#EF5350'};
    height: ${props => props.tamanho ? props.tamanho : 25};
    border-radius: 20px;
    justify-content: center;
`

const SubmitText = styled(Text)`
    color: ${props => props.textColor ? props.textColor : '#FFF'};
    font-size: ${props => props.size ? props.size : 14};
`

export const Submit = props => {
    const { children } = props
    return (
        <SubmitButton {...props}>
            <SubmitText {...props}>{children}</SubmitText>
        </SubmitButton>
    )
}

export const Nome = styled.Text`
    color: #FFF;
    font-size: 20px;
`