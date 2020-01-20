import React from 'react'
import { Text, Icon } from 'native-base'
import styled from 'styled-components'

import { Button } from '../../components'

import theme from '../../theme'

export const Container = styled.View``

export const ContainerFoto = styled.View`
    justify-content: center;
    align-items: center;
`

export const ContainerRenderFoto = styled.View`
    margin-left: 15px;
    margin-bottom: 100px;
`

export const ContainerFlexWrap = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
`

export const ContainerFlexBasis = styled.View`
    flex-basis: 33%;
`

const SubmitButton = styled(Button)`
    background: ${props  => props.color ? props.color : theme.colors.primary};
    margin: 5px 15px 5px 15px;
    border-radius: 20px;
    
`

const SubmitText = styled(Text)`
    color: #FFF;
    font-size: 18;
`

const IconButton = styled(Icon)`
    color: #FFF;
    font-size: 20;
`

export const Submit = props => {
    const { children, name, type } = props
    return (
        <SubmitButton {...props} full>
            <IconButton name={name} type={type} />
            <SubmitText>{children}</SubmitText>
        </SubmitButton>
    )
}
