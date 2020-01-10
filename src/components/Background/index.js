import React from 'react'
import { Container } from './styles'

export function Background(props) {
    const { children } = props
    return (
        <Container>
            {children}
        </Container>
    )
}