import { IonItemGroup, IonSlide, IonTextarea } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'
import { InfoDescription, TextArea } from './NTSlidesStyles'

interface NTSlideDescription {
    setDescription: (description: string) => void;
    hasInput: boolean;
}

const NTSlideDescription = ({setDescription} : NTSlideDescription) => {
    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Fortell oss litt om turen!</h2>
                <InfoDescription>Fortell andre brukere om denne turen. Er det flere stier? En bratt bakke man bør passe seg for?</InfoDescription>
                <TextArea rows={4} placeholder='beskriv destinasjonen' onIonInput={(e : any) => setDescription(e.target.value)} />
                <p>Sveip til høyre når du vil gå videre</p>
            </IonItemGroup>
        </IonSlide>

    )
}

export default NTSlideDescription