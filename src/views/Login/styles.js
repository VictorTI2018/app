import React from 'react'
import { TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components'
import { Text } from 'native-base'
import { TextField, Button } from '../../components'
import theme from '../../theme'

export const FormContainer = styled(KeyboardAwareScrollView)`
    flex: 1;
`
export const Input = styled(TextField).attrs({
    dark: false
})`

`
const SubmitButton = styled(Button)`
    background: ${theme.colors.primary};
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

const Link = styled(TouchableOpacity)`
    margin-bottom: 10px;
    margin-top: 10px;
`

const LinkText = styled(Text)`
    color: #000;
    font-size: 18px;
    text-align: center;
`

export const Anchor = props => {
    return (
        <Link {...props}>
            <LinkText>{props.children}</LinkText>
        </Link>
    )
}



