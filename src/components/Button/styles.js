import { Button } from 'native-base'
import styled from 'styled-components'
import theme from '../../theme'

export const NButton = styled(Button).attrs({
    transparent: true
})`
    height: ${theme.config.buttonHeight};
    border-radius: ${theme.config.buttonRadius};
`

export const PointerEvents = styled.View.attrs({
    pointerEvents: 'box-only'
  })``
  export const Container = styled.TouchableOpacity``