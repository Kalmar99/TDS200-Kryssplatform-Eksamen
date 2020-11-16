import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonPage, IonSpinner, IonText } from '@ionic/react';
import React, { useState } from 'react'
import ITrip from '../models/ITrip'
import ISection from '../models/ISection'
import {arrowBack} from 'ionicons/icons'
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Trip from '../components/Trip';
import {config} from '../utils/nhost-config'
import { Link } from 'react-router-dom';

interface ISectionResponse {
    sections: [ISection]
}

const TripDetails = ( props : any  ) => {
    
    /* This way of obtaining the trip object is copied from lecture 3 */
    const [trip,setTrip] = useState<ITrip>(props.location?.state?.trip)

    const FETCH_SECTIONS = gql`
        query fetchSection($userID : uuid) {
            sections(where: {trip_id: {_eq: $userID}}) {
                trip_id
                title
                image_name
                id
                description
            }
        }
    `;

    const {data, loading} = useQuery<ISectionResponse>(FETCH_SECTIONS,{
        variables: {
            userID: trip.user?.id
        }
    })

    let content;

    if (loading) {
        content =  <IonSpinner style={{margin: 'auto'}} name="circles" />
    } else {
        content = data?.sections.map((section,i) => <Trip key={i} id={i} title = {section.title} description={section.description} image_filename={section.image_name}  />)
    }

    return (
        <IonPage>
            <HeaderWithImage style={{backgroundImage: `URL(${config.backendUrl}/storage/o/public/${trip.image_filename}.jpg)`}}>
                <IonButtons>
                    <BackButton defaultHref="/home" />
                </IonButtons>
            </HeaderWithImage>
            <IonContent fullscreen>
                <Content>
                    <Title>{trip.title}</Title>
                    <p>Lagt ut av: <Link to={{
                        pathname: `/account/${trip.user?.id}`,
                        state: {id: trip.user?.id}
                    }}>{trip.user?.display_name}</Link></p>
                </Content>
                <Content>
                    <p>{trip.description}</p>
                </Content>
                <Content>
                    <h2>Severdigheter</h2>
                </Content>
                
                {content}

                <IonFooter>
                    <p>Hei</p>
                </IonFooter>

            </IonContent>
        </IonPage>
    )
}

const HeaderWithImage = styled(IonHeader)`
height: 15rem;
background-repeat: no-repeat;
background-size: 100% 100%;
background-blend-mode: darken;
`;

const Title = styled.h2`
    margin-top: .2rem;
`

const BackButton = styled(IonBackButton)`
    color: white;
    background-color: rgba(0, 0, 0,0.6);
    padding-right: 0.6rem;
    padding-bottom: 0.2rem;
    border-radius: 0px 0px 8px 0px;
`;

const Content = styled.div`
    margin: 1rem;
`;



export default TripDetails;