import React from 'react'
import { Container, Icon } from './styles'

export function IconToggle(props) {
    const { on, iconOn, iconOff, onPress, style, error } = props
    return (
        <Container onPress={onPress} {...props} error={!!error}>
            <Icon name={on ? iconOn : iconOff} style={style} error={!!error}/>
        </Container>
    )
}