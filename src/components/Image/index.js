import React from 'react'
import { Background } from '../Background'
import { ImageBackground, Container, Title, TitleContainer, SubTitle } from './styles'

export function Image(props) {
    const { children, title, img } = props
    return (
        <>
            <Container>
                <ImageBackground source={img} />
                {title && (
                    <TitleContainer>
                        <Title>
                            {title}
                        </Title>
                        <SubTitle>
                            {props.sub}
                        </SubTitle>
                    </TitleContainer>
                )}
            </Container>
            {children}
        </>
    )
}