import { IonInput, IonItemGroup, IonSlide, IonTextarea } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'


const DescriptionSlide = () => {
    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Fortell oss litt om turen!</h2>
                <InfoDescription>Fortell andre brukere om denne turen. Er det flere stier? En bratt bakke man bør passe seg for?</InfoDescription>
                <TextArea rows={4} placeholder='beskriv destinasjonen' />
                <p>Sveip til høyre når du vil gå videre</p>
            </IonItemGroup>
        </IonSlide>

    )
}

export const InfoDescription = styled.p`
    max-width: 19rem;
`;

export const TextArea = styled(IonTextarea)`
    border: 2px solid gray;
    border-radius: 4px;
`;

export default DescriptionSlide