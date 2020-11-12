import { IonButton, IonItemGroup, IonSlide } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {useCamera} from '@capacitor-community/react-hooks/camera';
import { CameraPhoto, CameraResultType } from '@capacitor/core';
import styled from 'styled-components';
import { ImageDescription, ImagePreview } from './NTSlidesStyles';
import { render } from '@testing-library/react';

interface NTSlidePicture {
    setPicture: (picture: CameraPhoto) => void;
    hasInput: boolean;
}

const NTSlidePicture = ({setPicture,hasInput} : NTSlidePicture) => {

    let [shownMsg,setShownMsg] = useState<boolean>(false)

    /*  The camera function and hook is copied from lecture 7 */
    const {isAvailable,getPhoto,photo} = useCamera()

    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        }).then ( photo => {
            setPicture(photo)
            setShownMsg(true)
        })
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
                <ImageDescription style={(!shownMsg && !hasInput ? {color: '#D64545'} : {})}>{text}</ImageDescription>
                <IonButton onClick={triggerCamera}>Ta Bilde</IonButton>
            </IonItemGroup>
        </IonSlide>
    )
}


export default NTSlidePicture;