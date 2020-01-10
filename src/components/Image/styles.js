import styled from 'styled-components'
import theme from '../../theme'

export const Container = styled.View`
    justify-content: center;
    align-items: center;
`

export const ImageBackground = styled.ImageBackground`
    width: 300px;
    height: 300px;
    border-radius: 10px;
`

export const TitleContainer = styled.View`
    margin-bottom: 5px;
`

export const Title = styled.Text`
    font-size: 30;
    color: red;
    text-align: center;
    font-family: ${theme.font};
`

export const SubTitle = styled.Text`
    font-size: 16;
    text-align: center;
    font-family: ${theme.font};
`