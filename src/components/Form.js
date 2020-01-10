import { useRef, useState } from 'react'
import { Keyboard } from 'react-native'

export function useForm (initialValues, rules = null, submit, getModel, disabled = false) {
  const [ values, setValues ] = useState(initialValues)
  const inputsRef = {}

  function handleChange (name, value) {
    setValues({
      ...values,
      [name]: value
    })
  }

  function handleSubmit () {
    Keyboard.dismiss()
    if (validate() && submit) {
      const model = getModel ? getModel() : {}
      return submit(model)
    }
  }

  function validate () {
    let hasError = false
    Object.keys(values).forEach((name) => {
      inputsRef[name].current.touched()
      const error = inputsRef[name].current.applyRules(true)
      if (error) {
        hasError = true
      }
    })
    return !hasError
  }

  function getFieldProps (name, nextInput = null) {
    inputsRef[name] = useRef()
    return [
      {
        onChangeText: (value) => handleChange(name, value),
        value: values[name],
        rules: rules[name],
        ref: inputsRef[name],
        returnKeyType: nextInput ? 'next' : 'done',
        onSubmitEditing: nextInput ? () => handleNextInput(nextInput) : () => handleSubmit(),
        disabled
      },
      { initialValue: initialValues[name], inputRef: inputsRef[name] }
    ]
  }

  function handleNextInput (name) {
    inputsRef[name].current.focus()
  }

  return { initialValues, handleChange, values, getFieldProps, validate, handleSubmit }
}