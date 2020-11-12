import { useCamera } from '@capacitor-community/react-hooks/camera';
import { CameraPhoto, CameraResultType } from '@capacitor/core';
import { IonPage, IonHeader, IonToolbar, IonContent, IonSlides, IonAlert } from '@ionic/react';
import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import ISection from '../models/ISection';


//Utils
import {generateHash} from '../utils/utils'

/*  Slides  */
import NTSlidePicture from '../components/NTSlides/NTSlidePicture';
import NTSlideTitle from '../components/NTSlides/NTSlideTitle';
import NTSlideDescription from '../components/NTSlides/NTSlideDescription';
import NTSlideInfo from '../components/NTSlides/NTSlideInfo';
import NTSlideSections from '../components/NTSlides/NTSlideSections';
import NTSlidePublish from '../components/NTSlides/NTSlidePublish';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { auth, storage } from '../utils/nhost';

const NewTrip = () => {

    const INSERT_TRIP = gql`
        mutation insert_trips_one($trip: trips_insert_input!) {
            insert_trips_one(object: $trip) {
            id
            }
        }
    `;

    const INSERT_SECTIONS = gql`
        mutation insertTrip($sections : [sections_insert_input!]!) {
            insert_sections(objects: $sections) {
            affected_rows
            }
        }
    `;

    const [insertTripMutation] = useMutation(INSERT_TRIP)
    const [insertSectionsMutation] = useMutation(INSERT_SECTIONS)

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

    const prepareSections = async (id : number) => {
        
        /*  This way of implementing async map is based on code from this guide:
            https://flaviocopes.com/javascript-async-await-array-map/
            but modified to fit my project & data
        */

        const asyncPrepp = async (section: ISection) => {
            const imageName = `${generateHash(section.title + section.description)}-${Date.now() * Math.random()}`
            await uploadImage(section.image_name,imageName)
            section.trip_id = id
            section.image_name = imageName;
            return section
        }

        let preparedSections = sections.map( (section) => asyncPrepp(section) )

        return Promise.all(preparedSections)
    }

    /*  Code in this function is based on the code shown in lecture 8 but modified to fit my project    */
    const publish = async () => {
        try {
        
            //Get a (fairly) uniqe name
            const image_name = `${Date.now() * Math.random()}${generateHash(title!)}`
            await uploadImage((picture?.dataUrl as string),image_name)

            // insert the new trip and get the id
            let id = await insertTripMutation({
                variables: {
                    trip: {
                        title: title,
                        description: description,
                        image_filename: image_name,
                        user_id: auth.getClaim('x-hasura-user-id')
                    }
                }
            })

            //Put the id on all the sections
            let preppedSections = await prepareSections(id.data.insert_trips_one.id)

            await insertSectionsMutation({
                variables: {
                    sections: preppedSections
                }
                    
            })
            

        } catch (error) {
            console.log(error)
        }
    }

    /*  Code in this function is copied from lecture 7 but modified to fit my project    */
    const uploadImage = async (image: string, name: string) => {
        await storage.putString(`/public/${name}.jpg`,image, 'data_url',null, (progress : ProgressEvent) => {
            console.log(progress.loaded)
        })
    }

    const [locked,setLocked] = useState<boolean>(true)

    /*  
    The Code for getting the swiper object is copied from here:
    https://forum.ionicframework.com/t/get-swiper-instance-from-slides-component/186503  
    copied function: initSwiper()
    */
    const [swiper,setSwiper] = useState<any>({});
    const [hasInput,setHasInput] = useState(true)


    const initSwiper = async function(this: any) {
        let swiper = await this.getSwiper()

        setSwiper(swiper);

        
    }

    //Checking if user has provided input. if not lock the slideshow
    const canChange = () => {
        switch(index) {
            case 2:
                swiper.allowSlideNext = (title != undefined) 
                setHasInput(title != undefined)
                console.log(title != undefined)
            break;
            case 3:
                swiper.allowSlideNext = (picture != undefined)
                setHasInput(picture != undefined)
            break;
            case 4:
                swiper.allowSlideNext = (description != undefined)
                setHasInput(description != undefined)
            break;
            default:
                swiper.allowSlideNext = true;
                setHasInput(true)
            break;
        }
    }
    
 
    return (
        <IonPage>
            <IonContent fullscreen>
                <DotsRow>
                    {dots.map((dot) => dot)}
                </DotsRow>
                {/* Lock the slider if no data is typed in. */}
                <Slideshow onIonSlidesDidLoad={initSwiper}
                    onIonSlideNextEnd={ () => setIndex((old) => old+=1)} 
                    onIonSlidePrevEnd={ () => setIndex((old) => old-=1)}
                    onIonSlideTouchStart={canChange}
                    >
                   <NTSlideInfo />
                   <NTSlideTitle setTitle={setTitle} hasInput={hasInput}/>
                   <NTSlidePicture setPicture={setPicture} hasInput={hasInput} />
                   <NTSlideDescription setDescription={setDescription} hasInput={hasInput}/>
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