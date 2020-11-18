import { CameraPhoto } from '@capacitor/core'
import { IonButton, IonItem, IonItemGroup, IonSlide } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'
import ISection from '../../models/ISection'
import ITrip from '../../models/ITrip'
import SectionDisplay from './SectionDisplay'

interface NTSlidePublish {
        title?: string,
        description?: string,
        image?: CameraPhoto,
        sections?: ISection[]
        publish: () => void;
}

const NTSlidePublish = ({title,description,image,sections,publish} : NTSlidePublish) => {

    return (
        <IonSlide>
            <IonItemGroup style={{marginBottom: '8rem'}}>
                <h2>Nesten Ferdig!</h2>
                <PreviewBox>
                    <PreviewImage style={{backgroundImage:`URL(${image?.dataUrl})`}}/>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <h4>Aktiviteter</h4>
                    {sections?.map((section) => <SectionDisplay key={section.title + section.image_name} title={section.title} description={section.description} image={section.image_name} />)}
                </PreviewBox>
                <p>Her kan du se en forhåndsvisning av den nye turen og publisere den.</p>
                <IonButton onClick={publish}>Publiser</IonButton>
            </IonItemGroup>
        </IonSlide>
    )
}

const PreviewImage = styled.div`
    height: 15rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-blend-mode: darken;

`;


const PreviewBox = styled.div`
    margin: auto;
    width: 18rem;
    height: 32rem;
    text-align:left !important;
    border-radius: 20px;
    border: 10px solid black;
    overflow-y: scroll;
    overflow-x: hidden;

    h3 {
        margin-left: 0.6rem;
    }

    p {
        margin-left: 0.6rem; 
    }

    h4 {
        margin-left: 0.6rem;
    }

`

export default NTSlidePublish