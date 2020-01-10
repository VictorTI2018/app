import React from 'react'
import { CheckBox } from 'react-native-elements'
import styled from 'styled-components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from 'native-base'
import { TextField, Button } from '../../components'
import theme from '../../theme'


export const FormContainer = styled(KeyboardAwareScrollView)`
    flex: 1;
`

export const Input = styled(TextField).attrs({
    dark: false
})``

const SubmitButton = styled(Button)`
    background: ${props  => props.color ? props.color : theme.colors.primary};
    margin: 5px 15px 5px 15px;
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

const LogoContainer = styled.View`
  flex-direction: row;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`
const LogoImage = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: 100%;
  width: 50%;
`

export const Logo = props => (
  <LogoContainer>
    <LogoImage source={props.source} />
  </LogoContainer>
)

export const Row = styled.View`
  flex-direction: row;
`

export const Check = styled(CheckBox)`
  background-color: transparent;
`

export const RoundedSelect = styled.View`
   flex: 1;
   border-radius: 20px;
   border-width: 1px;
   border-color: ${props => props.error ? theme.colors.errors : theme.colors.primary};
   padding: 0 10px 0 10px;
   margin: 10px 0 5px 0;
`