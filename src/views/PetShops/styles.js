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
