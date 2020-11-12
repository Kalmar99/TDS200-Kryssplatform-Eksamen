import { IonItemGroup, IonSlide} from '@ionic/react'
import React from 'react'

import {Input} from './NTSlidesStyles'

interface NTSlideTitle {
    setTitle: (title: string) => void
}

const NTSlideTitle = ({setTitle} : NTSlideTitle) => {

    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Hva heter destinasjonen?</h2>
                <Input type="text" placeholder="Navn på destinasjon" onIonInput={(e : any) => setTitle(e.target.value)} />
                <p>Sveip til høyre når du er ferdig</p>
            </IonItemGroup>
        </IonSlide>
    )
}

export default NTSlideTitle;