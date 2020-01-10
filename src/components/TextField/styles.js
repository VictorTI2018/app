import React, { forwardRef } from 'react'
import { TextInput } from 'react-native'
import { Item } from 'native-base'
import styled from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'
import { Text as AnimatabledText } from 'react-native-animatable'
import { any, bool, node, string } from 'prop-types'

import theme from '../../theme'
import { Slot } from '../Slot'

export const FormContainer = styled.View`
  
`
export const Container = styled(Item)`
  border-bottom-color: 0;
  background-color: transparent;
  
`
Container.propTypes = {
  error: bool,
  dark: bool
}
Container.defaultProps = {
  dark: true
}
const InputMask = styled(TextInputMask).attrs(({ type, disabled }) => ({
  type,
  enablesReturnKeyAutomatically: true,
  editable: disabled
}))`
  flex: 1;
  border-radius:20px;
  border-width: 1px;
  border-color: ${props => props.error ? theme.colors.errors : theme.colors.primary};
  position: relative;
  /* max-height: 100000px;
  min-height: ${theme.config.inputHeightBase}; */
  margin: 10px 0 0 0;
  color: ${props => props.color}; 
  opacity: 1;
  padding-left: 20px;
`
InputMask.propTypes = {
  type: string,
  disabled: bool,
  dark: bool
}
InputMask.defaultProps = {
  dark: true
}
export const Label = styled(AnimatabledText).attrs(props => ({
  useNativeDriver: true,
  easing: 'linear',
  duration: 100,
  animation: {
    from: {
      translateY: props.focused ? 0 : -theme.config.animationHeightBase
    },
    to: {
      translateY: props.focused ? -theme.config.animationHeightBase : 0
    }
  }
}))`
  position: absolute;
  top: ${props => props.multiline ? 12 : 6};
  font-size: ${theme.config.label.fontSize};
  color: ${props => props.error ? theme.colors.errors : (props.dark ? theme.colors.primary : theme.colors.placeholder)};
  font-family: ${theme.font};
  font-size: ${props => props.focused ? 13 : 20};
  margin-left: 20px;
  opacity: ${props => props.error ? 1 : (props.dark ? 0.64 : 0.32)};
`
Label.propTypes = {
  children: node.isRequired,
  focused: bool,
  dark: bool
}
Label.defaultProps = {
  dark: true
}

export const Input = forwardRef((props, ref) => {
  return (
    <InputMask
      as={props.type ? InputMask : TextInput}
      ref={ref}
      {...props}
    />
  )
})
Input.propTypes = {
  type: string,
  refInput: any,
  color: string
}
Input.defaultProps = {
  color: 'black'
}
export const Error = styled.Text`
  color: ${theme.colors.errors};
  margin-left: 26px;
  margin-bottom: 10px;
`
export const Prepend = styled(Slot).attrs({
  name: 'prepend'
})`
  margin-left: ${theme.config.defaultPadding};
`
export const Append = styled(Slot).attrs({
  name: 'append'
})`
  margin-right: 10px;
`