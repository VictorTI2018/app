import React from 'react'
import { Text } from 'native-base'
import { CheckBox } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components'

import { Button } from '../../components'

import theme from '../../theme'

export const Container = styled.ScrollView`

`
export const ContainerImage = styled.View`
    justify-content: center;
    align-items: center;
    margin: 20px;
`
export const FotoPet = styled.Image`
    width: 140;
    height: 140;
    border-radius: 100px;
`

export const ContainerTitle = styled.View`
    justify-content: center;
    align-items: center;
    margin: 10px;
`

export const Title = styled.Text`
    font-size: 34px;
    color: ${theme.colors.errors};
`

export const SubTitle = styled.Text`
    font-size: 20px;
`


export const Row = styled.View`
  flex-direction: row;
  margin: 10px;
`

export const RoundedSelect = styled.View`
   border-radius: 20px;
   flex-basis: 48%;
   border-width: 1px;
   border-color: ${props => props.error ? theme.colors.errors : theme.colors.primary};
   padding: 0 10px 0 10px;
   margin: 5px 5px 0 5px;
`

export const Select = styled(RNPickerSelect)`
`

export const ContainerSelect = styled.View`
    border-radius: 20px;
   border-width: 1px;
   border-color: ${props => props.error ? theme.colors.errors : theme.colors.primary};
   padding: 0 10px 0 10px;
   margin: 10px 10px 5px 15px;
`

const SubmitButton = styled(Button)`
    background: ${props => props.colors ? props.colors : theme.colors.primary};
    margin: 15px 10px 15px 10px;
    border-radius: 20px;
`

const SubmitText = styled(Text)`
    color: #FFF;
    font-size: 18;
`

export const Submit = props => {
    const { children } = props
    return (
        <SubmitButton {...props} full>
            <SubmitText>{children}</SubmitText>
        </SubmitButton>
    )
}

export const Check = styled(CheckBox)`
  background-color: transparent;
`

export const ContainerCheck = styled.View`
    margin-left: 40px;
`
