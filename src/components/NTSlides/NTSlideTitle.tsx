import { IonItemGroup, IonSlide} from '@ionic/react'
import React, { useState } from 'react'
import styled from 'styled-components'

import {Input} from './NTSlidesStyles'

interface NTSlideTitle {
    setTitle: (title: string) => void
    hasInput: boolean
}

const NTSlideTitle = ({setTitle,hasInput} : NTSlideTitle) => {

    const [styleobject,setStyle] = useState<any>({})
    const [shownFeedback,setFeedback] = useState(false)
    const [displayText,setDisplayText] = useState<boolean>()

    if (!hasInput && !shownFeedback) {
        setStyle({
            border: '2px solid red'
        })
        setDisplayText(true)
        setFeedback(true)
    }

    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Hva heter destinasjonen?</h2>
                <Input style={styleobject} type="text" placeholder="Navn på destinasjon" onIonInput={(e : any) => {
                    setTitle(e.target.value); 
                    setStyle({border: '2px solid green'});
                    setDisplayText(false)
                }} />
                { (displayText) ? <ErrorMsg>Dette feltet kan ikke være blankt</ErrorMsg> : displayText != undefined && <SuccessMsg>Godkjent</SuccessMsg>}
                <p>Sveip til høyre når du er ferdig</p>
            </IonItemGroup>
        </IonSlide>
    )
}

const ErrorMsg = styled.p`
    font-size: 3vw;
    color: red;
`;

const SuccessMsg = styled.p`
    font-size: 3vw;
    color: green;
`;

export default NTSlideTitle;