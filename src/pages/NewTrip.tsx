import { useCamera } from '@capacitor-community/react-hooks/camera';
import { CameraPhoto, CameraResultType } from '@capacitor/core';
import { IonPage, IonHeader, IonToolbar, IonContent, IonSlides } from '@ionic/react';
import { search } from 'ionicons/icons';
import React, { useState } from 'react'
import styled from 'styled-components';
import DescriptionSlide from '../components/NewPostSlides/DescriptionSlide';
import InfoSlide from '../components/NewPostSlides/InfoSlide';
import PictureSlide from '../components/NewPostSlides/PictueSlide';
import SectionSlide from '../components/NewPostSlides/SectionsSlide';
import TitleSlide from '../components/NewPostSlides/TitleSlide';



const NewTrip = () => {

    const [index,setIndex] = useState<number>(1)

    const [title, setTitle] = useState<string>()
    const [picture,setPicture] = useState<CameraPhoto>()


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
            dots.push(<IndexDot />)
        }

        let remaining = (5 - index)
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

                dots.push(<IndexDot />)
            }
        }
 
    }


    return (
        <IonPage>
            <IonContent fullscreen>
                <DotsRow>
                    {dots.map((dot) => dot)}
                </DotsRow>
                <Slideshow onIonSlideNextEnd={ () => setIndex((old) => old+=1)} onIonSlidePrevEnd={ () => setIndex((old) => old-=1) }>
                   <InfoSlide />
                   <TitleSlide setTitle={setTitle}/>
                   <PictureSlide setPicture={setPicture} />
                   <DescriptionSlide />
                   <SectionSlide />
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
    margin-top: 5rem;
`;



export default NewTrip;