import { IonInput, IonItem, IonItemGroup, IonSlide, IonTitle } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'

import Input from './Input'

interface TitleSlideProps {
    setTitle: (title: string) => void
}

const TitleSlide = ({setTitle} : TitleSlideProps) => {

    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Hva heter destinasjonen?</h2>
                <Input type="text" placeholder="Navn på destinasjon" onChange={(e : any) => setTitle(e.detail.value)} />
                <p>Sveip til høyre når du er ferdig</p>
            </IonItemGroup>
        </IonSlide>
    )
}



export default TitleSlide;