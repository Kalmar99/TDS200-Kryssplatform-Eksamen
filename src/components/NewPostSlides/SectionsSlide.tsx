import { useCamera } from '@capacitor-community/react-hooks/camera'
import { CameraResultType } from '@capacitor/core'
import { IonButton, IonItemDivider, IonItemGroup, IonSlide } from '@ionic/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { InfoDescription, TextArea } from './DescriptionSlide'
import Input from './Input'
import { ImagePreview } from './PictueSlide'

const SectionSlide = () => {


    /*  The camera function and hook is copied from lecture 7 */
    const {isAvailable,getPhoto,photo} = useCamera()
    

    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        })
    }

    let displayPhoto;

    if(photo) {
        displayPhoto = <ImagePreview src={photo.dataUrl} onClick={triggerCamera} />
    } else {
        displayPhoto = <IonButton onClick={triggerCamera}>Ta Bilde</IonButton>
    }


    return (
        <IonSlide>
            <OneLineGroup>
                
                    <h2>Legg til aktiviteter</h2>
                    <InfoDescription>Finnes det noen spesielle aktiviteter man kan gjøre på denne turen. F.eks fisking, bading, klatring osv</InfoDescription>
                    {displayPhoto}
                    {photo && <p style={{fontSize: '4vw', marginTop: '0'}}>Trykk på bildet for å ta et nytt</p>}
                    <p>Navn</p>
                    <Input onChange={() => 0} placeholder='Aktivitetens Navn f.eks: Fisking' />
                    <p>Beskrivelse</p>
                    <TextArea rows={3} placeholder='Fortell litt om aktiviteten'/>
                    <IonButton onClick={() => 0} style={{float: 'left', marginTop: '0.5rem', display: 'block'}}>Legg til aktivitet</IonButton><br /><br /> <hr />
                    <p>Aktiviteter:</p>
            </OneLineGroup>
            
            
        </IonSlide>
    )
}

const OneLineGroup = styled.div`
    width: 15rem !important;
    min-width: 15rem !important;
`;

export default SectionSlide;