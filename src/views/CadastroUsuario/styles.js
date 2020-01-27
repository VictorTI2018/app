import React from 'react'
import styled from 'styled-components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from 'native-base'
import { TextField, Button } from '../../components'
import theme from '../../theme'


export const FormContainer = styled(KeyboardAwareScrollView)`
    flex: 1;
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin: 0 10px;
`

export const Input = styled(TextField).attrs({
    dark: false
})`

`

const SubmitButton = styled(Button)`
    background: ${theme.colors.buttonCadastro};
    margin: 40px 15px 0 15px;
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
  width: 40%;
  border-radius: 100px;
`

export const Logo = props => (
  <LogoContainer>
    <LogoImage source={props.source} />
  </LogoContainer>
)


