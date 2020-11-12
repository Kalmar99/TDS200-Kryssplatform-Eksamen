import { IonItemGroup, IonSlide} from '@ionic/react'
import React, { useState } from 'react'
import styled from 'styled-components'

import {Input,ErrorMsg,SuccessMsg,NTSColors} from './NTSlidesStyles'

interface NTSlideTitle {
    setTitle: (title: string) => void
    hasInput: boolean
}

const NTSlideTitle = ({setTitle,hasInput} : NTSlideTitle) => {

    const [shownMsg,setShownMsg] = useState<boolean>()

    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Hva heter destinasjonen?</h2>
                <Input style={ (!hasInput && !shownMsg) ? {border: `2px solid ${NTSColors.error}`} : (shownMsg != undefined ? {border: `2px solid ${NTSColors.success}`} : {}) } type="text" placeholder="Navn på destinasjon" onIonInput={(e : any) => {
                    setTitle(e.target.value); 
                    setShownMsg(true)
                }} />
                 { !hasInput && !shownMsg ? <ErrorMsg>Dette feltet kan ikke være blankt</ErrorMsg> : (shownMsg != undefined ? <SuccessMsg>Godkjent</SuccessMsg> : "") }
                <p>Sveip til høyre når du er ferdig</p>
            </IonItemGroup>
        </IonSlide>
    )
}


export default NTSlideTitle;