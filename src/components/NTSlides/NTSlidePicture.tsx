import { IonButton, IonItemGroup, IonSlide } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {useCamera} from '@capacitor-community/react-hooks/camera';
import { CameraPhoto, CameraResultType } from '@capacitor/core';
import styled from 'styled-components';

interface NTSlidePicture {
    setPicture: (picture: CameraPhoto) => void
}

const NTSlidePicture = ({setPicture} : NTSlidePicture) => {

    let [hasAsked,setAsked] = useState(false)

    /*  The camera function and hook is copied from lecture 7 */
    const {isAvailable,getPhoto,photo} = useCamera()

    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        }).then ( photo =>
           setPicture(photo) 
        )
    }

    let text = ""

    if(photo) {
        text = "Kjempeflott bilde. sveip til høyre for å gå videre"
    } else {
        text = "Trykk på ta bilde for å åpne kamera"
    }

    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Ta et bilde av turen</h2>
                <ImagePreview src={photo?.dataUrl} />
                <ImageDescription>{text}</ImageDescription>
                <IonButton onClick={triggerCamera}>Ta Bilde</IonButton>
            </IonItemGroup>
        </IonSlide>
    )
}

export const ImagePreview = styled.img`
    width: 14rem !important;
    border-radius: 5px;
`;

export const ImageDescription = styled.p`
    max-width: 14rem;
`;

export default NTSlidePicture;