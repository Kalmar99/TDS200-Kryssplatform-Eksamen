import { IonItem, IonItemGroup, IonSlide } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'
import ImageRounded from '../Design/ImageRounded'

const NTSlideInfo = () => {
    return (
        <IonSlide>
            <IonItemGroup>
                <ImageRounded url={'./assets/img/explore.jpg'} x='-250px' y='-25px' w={'14rem'} h={'14rem'} />
                <h2>Bli med å spre tur glede!</h2>
                <InfoDescription>Legg ut en tur slik at andre kan dele din tur glede. Det er kjempe enkelt! Ta et bilde, legg til tittel, beskrivelse og eventuelle severdigheter i nærheten. Sveip til høyre for å fortsette</InfoDescription>
            </IonItemGroup>
        </IonSlide>
    )
}

const InfoDescription = styled.p`
    max-width: 18rem;
`

export default NTSlideInfo;