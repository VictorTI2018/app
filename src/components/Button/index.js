import React from 'react'

import { Container, NButton, PointerEvents } from './styles'
import { array, bool, func, object, oneOfType } from 'prop-types'

export function Button (props) {
  const { onPress, disabled } = props
  return (
    <Container disabled={disabled} onPress={onPress}>
      <PointerEvents>
        <NButton {...props} />
      </PointerEvents>
    </Container>
  )
}

Button.propTypes = {
  onPress: func.isRequired,
  disabled: bool,
  style: oneOfType([
    object,
    array
  ])
}