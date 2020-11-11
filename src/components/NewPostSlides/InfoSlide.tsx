import { IonItem, IonItemGroup, IonSlide } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'

const InfoSlide = () => {
    return (
        <IonSlide>
            <IonItemGroup>
                <RoudedImage />
                <h2>Bli med å spre tur glede!</h2>
                <InfoDescription>Legg ut en tur slik at andre kan dele din tur glede. Det er kjempe enkelt! Ta et bilde, legg til tittel, beskrivelse og eventuelle severdigheter i nærheten. Sveip til høyre for å fortsette</InfoDescription>
            </IonItemGroup>
        </IonSlide>
    )
}


const RoudedImage = styled.div`
    width: 14rem;
    height: 14rem;
    background: URL('./assets/img/explore.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-position-x: -250px;
    background-position-y: -25px;
    margin:auto;
    display:block;
    border-radius: 14rem;
`

const InfoDescription = styled.p`
    max-width: 18rem;
`

export default InfoSlide;