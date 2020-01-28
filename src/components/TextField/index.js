import React, { useState } from 'react'
import TextInputMask from 'react-native-text-input-mask'


import { Container, FormContainer, Input } from './styles'

export function TextField(props) {

  const [isFocused, setFocused] = useState(false)


  function handlerBlur() {
    setFocused(false)
    const { onBlur } = props
    if (onBlur) {
      onBlur(...arguments)
    }
  }

  function handlerFocus() {
    setFocused(true)
    const { onFocus } = props
    if (onFocus) {
      onFocus(...arguments)
    }
  }


  const inputProps = {
    ...props,
    onBlur: handlerBlur,
    onFucs: handlerFocus
  }
  return (
    <FormContainer>
      <Container >
        <Input
          {...inputProps}
        />

      </Container>
    </FormContainer>
  )
}

