import { IonItemGroup, IonSlide, IonTextarea } from '@ionic/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import TextArea from '../Forms/TextArea'
import { InfoDescription, ErrorMsg,SuccessMsg,NTSColors } from './NTSlidesStyles'

interface NTSlideDescription {
    setDescription: (description: string) => void;
    hasInput: boolean;
}

const NTSlideDescription = ({setDescription,hasInput} : NTSlideDescription) => {
    
    const [shownMsg,setShownMsg] = useState<boolean>()
    
    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Fortell oss litt om turen!</h2>
                <InfoDescription>Fortell andre brukere om denne turen. Er det flere stier? En bratt bakke man bør passe seg for?</InfoDescription>
                <TextArea onInput={setDescription} placeholder='beskriv destinasjonen'  />
                { !hasInput && !shownMsg ? <ErrorMsg>Dette feltet kan ikke være blankt</ErrorMsg> : (shownMsg != undefined ? <SuccessMsg>Godkjent</SuccessMsg> : "") }
                <p>Sveip til høyre når du vil gå videre</p>
            </IonItemGroup>
        </IonSlide>

    )
}
//<TextArea style={ (!hasInput && !shownMsg) ? {border: `2px solid ${NTSColors.error}`} : (shownMsg != undefined ? {border: `2px solid ${NTSColors.success}`} : {}) } rows={4} placeholder='beskriv destinasjonen' onIonInput={(e : any) => {setDescription(e.target.value); setShownMsg(true)}} />
export default NTSlideDescription