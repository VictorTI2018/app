import styled from 'styled-components'
import FIcon from 'react-native-vector-icons/FontAwesome'
import theme from '../../theme'

export const Container = styled.TouchableOpacity``

export const Icon = styled(FIcon).attrs((props) => ({
    color: props.error ? theme.colors.errors : (props.color ? props.color : theme.colors.primary)
}))``