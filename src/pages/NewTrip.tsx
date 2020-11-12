import { useCamera } from '@capacitor-community/react-hooks/camera';
import { CameraPhoto, CameraResultType } from '@capacitor/core';
import { IonPage, IonHeader, IonToolbar, IonContent, IonSlides } from '@ionic/react';
import React, { useState } from 'react'
import styled from 'styled-components';
import ISection from '../models/ISection';

/*  Slides  */
import NTSlidePicture from '../components/NTSlides/NTSlidePicture';
import NTSlideTitle from '../components/NTSlides/NTSlideTitle';
import NTSlideDescription from '../components/NTSlides/NTSlideDescription';
import NTSlideInfo from '../components/NTSlides/NTSlideInfo';
import NTSlideSections from '../components/NTSlides/NTSlideSections';
import NTSlidePublish from '../components/NTSlides/NTSlidePublish';

const NewTrip = () => {

    const [index,setIndex] = useState<number>(1)

    const [title, setTitle] = useState<string>()
    const [picture,setPicture] = useState<CameraPhoto>()
    const [description,setDescription] = useState<string>()
    const [sections,setSections] = useState<ISection[]>([])


    let dots = []

    if(index != undefined) {

        for (let i = 0; i < index; i++) {

            const IndexDot = styled.div`
                width: 1rem;
                height: 1rem;
                border-radius: 500px;
                background-color: #3686E2;
                display: inline-block;
                margin: .2rem;
            `;
            dots.push(<IndexDot key={i} />)
        }

        let remaining = (6 - index)
        if(remaining > 0) {
            for(let i = 0; i < remaining; i++) {
                const IndexDot = styled.div`
                width: 1rem;
                height: 1rem;
                border-radius: 500px;
                background-color: #DBDBDB;
                display: inline-block;
                margin: .2rem;
                `;

                dots.push(<IndexDot key={i * 145 / 5000 + (new Date().getTime() ) } />)
            }
        }
 
    }

    const publish = () => {
        console.log("Done")
    }


    return (
        <IonPage>
            <IonContent fullscreen>
                <DotsRow>
                    {dots.map((dot) => dot)}
                </DotsRow>
                <Slideshow onIonSlideNextEnd={ () => setIndex((old) => old+=1)} onIonSlidePrevEnd={ () => setIndex((old) => old-=1) }>
                   <NTSlideInfo />
                   <NTSlideTitle setTitle={setTitle}/>
                   <NTSlidePicture setPicture={setPicture} />
                   <NTSlideDescription setDescription={setDescription}/>
                   <NTSlideSections updateSections={setSections}/>
                   <NTSlidePublish publish={publish} title={title} image={picture} description={description}  sections={sections} />
                </Slideshow>
            </IonContent>
        </IonPage>
    )
}

const DotsRow = styled.div`
    display: flex;
    justify-content: center;
    margin-top: .7rem;
`

const Slideshow = styled(IonSlides)`
    margin-top: 3rem;
`;



export default NewTrip;