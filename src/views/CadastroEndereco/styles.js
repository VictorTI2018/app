import React from 'react'
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
    background: ${props  => props.color ? props.color : theme.colors.buttonCadastro};
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

export const ImagemContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`

export const Container = styled.View`
    margin-bottom: 150px;
`

export const Title = styled.Text`
    text-align: center;
    font-size: 24.5;
    color: #000;
`

export const ButtonContainer = styled.View`
     margin-top: 100px;
`

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