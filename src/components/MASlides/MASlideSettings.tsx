import { IonButton, IonSlide, IonTitle } from '@ionic/react';
import React, { useEffect } from 'react'
import { auth } from '../../utils/nhost';


const MASlideSettings = () => {


    return (
        <IonSlide>
            <p>Settings</p>
            <IonButton onClick={() => auth.logout()}> Logg Ut </IonButton>
        </IonSlide>
    )
}

export default MASlideSettings;