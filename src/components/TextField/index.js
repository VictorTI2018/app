import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import useForceUpdate from 'use-force-update'
import { get, isEmpty, isString, omit } from 'lodash'
import { validate as validatejs } from 'validate.js'
import { any, array, bool, func, number, object, string } from 'prop-types'

import { unmask } from '../../helpers'

import { Append, Container, Error, FormContainer, Input, Label, Prepend } from './styles'

export const TextField = forwardRef((props, ref) => {
  const { label, onChangeText, value, onFocus, onBlur, inputColor, multiline, returnKeyType, options, dark, rules, disabled } = props
  const { keyboardType, secureTextEntry, textContentType, maxLength, uppercase, onSubmitEditing } = props
  const [touched, setTouched] = useState(false)
  const [type, setType] = useState(props.type)
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const forceUpdate = useForceUpdate()

  useImperativeHandle(ref, () => ({
    validate,
    value,
    focus,
    applyRules,
    error,
    touched: () => {
      setTouched(true)
    }
  }))

  useEffect(forceUpdate, [value])
  useEffect(() => {
    applyRules()
  }, [touched, focused, value])

  function applyRules(isForm = false) {
    if (touched || isForm) {
      let errorRules = null
      if (rules) {
        rules
          // se a regra for diferente de presence (required) não valida se estiver vazio
          // isso porque as validacoes padrao da lib não possuem opcao de ignorar vazio
          .filter(r => r.presence || !isEmpty(value))
          .forEach(rule => {
            const lazyError = validatejs({ [label]: value }, { [label]: omit(rule, 'lazy') }, { fullMessages: false })
            if (!errorRules) {
              errorRules = lazyError
            }
          })
      }

      errorRules = get(errorRules, `${label}.0`)
      if (errorRules !== error) {
        setError(errorRules)
      }
      return !!errorRules
    }
    return false
  }

  function handleFocus() {
    setFocused(true)
    if (onFocus) {
      onFocus(...arguments)
    }
  }

  function handleBlur() {
    setFocused(false)
    setTouched(true)
    if (onBlur) {
      onBlur(...arguments)
    }
  }

  function handleTextChange(text, rawText) {
    let lazyText = rawText || text
    setFocused(true)
    if (isString(lazyText) && uppercase) {
      lazyText = lazyText
    }
    if (onChangeText) {
      onChangeText(lazyText)
    }
  }

  function parseType(value) {
    let lazyType = type
    if (props.type === 'cpf_cnpj') {
      lazyType = value !== undefined && value.length > 11 ? 'cnpj' : 'custom'
    } else {
      lazyType = props.type
    }

    if (type !== lazyType) {
      setType(lazyType)
    }

    return lazyType
  }

  function validate() {
    if (props.type === 'cpf_cnpj') {
      // noinspection JSUnresolvedFunction
      return inputRef.current.isValid()
    }
    return true
  }

  function getOptionsType() {
    if (props.type && props.type === 'cpf_cnpj') {
      return {
        ...options,
        ...{
          mask: '999.999.999-999',
          validator: (value) => MaskService.isValid('cpf', value),
          getRawValue: unmask
        }
      }
    }

    return { ...options }
  }

  function focus() {
    if (props.type) {
      inputRef.current._inputElement.focus()
    } else {
      inputRef.current.focus()
    }
  }

  return (
    <FormContainer>
      <Container >
        <Prepend {...props} />
        <Input
          {...props}
          dark={dark}
          disabled={!disabled}
          value={value}
          type={parseType(value)}
          options={getOptionsType()}
          autoCapitalize='none'
          onFocus={handleFocus}
          error={!!error}
          includeRawValueInChangeText={type !== 'datetime'}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          onChangeText={handleTextChange}
          textContentType={textContentType}
          ref={inputRef}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType || (props.type === 'cpf_cnpj' ? 'numeric' : 'default')}
          color={inputColor}
          returnKeyType={multiline && Platform.OS === 'android' ? 'none' : returnKeyType}
          blurOnSubmit={!multiline && returnKeyType !== 'next'}
        />
        <Append {...props} />
      </Container>
      {error && <Error>{error}</Error>}
    </FormContainer>
  )
})

TextField.propTypes = {
  label: string,
  onChangeText: func.isRequired,
  value: any,
  type: string,
  onFocus: func,
  onBlur: func,
  inputColor: string,
  multiline: bool,
  returnKeyType: string,
  options: object,
  dark: bool,
  rules: array,
  disabled: bool,
  keyboardType: string,
  secureTextEntry: bool,
  textContentType: string,
  maxLength: number,
  uppercase: bool,
  onSubmitEditing: func
}
TextField.defaultProps = {
  uppercase: true
}