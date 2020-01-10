import React, {  useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import theme from '../../theme'

import { Container, ContainerInput, Toucha, Input } from './styles'

export function PasswordField(props) {
    const [ hidePassword, setHidePassword ] = useState(true)

    function showPassword() {
        setHidePassword(!hidePassword)
    }

    return (
      <Container>
          <ContainerInput>
              <Input underlineColorAndroid='transparent' secureTextEntry={hidePassword} {...props}/>
              <Toucha activeOpacity={0.8} onPress={showPassword} style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Icon name={!hidePassword ? 'eye' : 'eye-slash'} size={20} color={theme.colors.primary} />
              </Toucha>
                         
          </ContainerInput>
      </Container>
    )
}
