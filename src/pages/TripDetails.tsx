import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonSpinner, IonText } from '@ionic/react';
import React from 'react'
import ITrip from '../models/ITrip'
import ISection from '../models/ISection'
import {arrowBack} from 'ionicons/icons'
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Trip from '../components/Trip';


interface ISectionResponse {
    sections: [ISection]
}

const TripDetails = ( props : any  ) => {
    
    /* This way of obtaining the trip object is copied from lecture 3 */
    const trip : ITrip = props.location?.state?.trip

    const FETCH_SECTIONS = gql`
        query {
            sections(where: {trip_id: {_eq: ${trip.id}}}) {
                trip_id
                title
                image_name
                id
                description
            }
        }
    `;

    const {data, loading} = useQuery<ISectionResponse>(FETCH_SECTIONS)

    const HeaderWithImage = styled(IonHeader)`
        height: 15rem;
        background-image: URL(./assets/img/${trip.image_filename});
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-blend-mode: darken;
    `;

    console.log(trip)

    let content;

    if (loading) {
        content =  <IonSpinner style={{margin: 'auto'}} name="circles" />
    } else {
        content = data?.sections.map((section) => <Trip id={0} title = {section.title} description={section.description} image_filename={section.image_name}  />)
    }
    
    return (
        <IonPage>
            <HeaderWithImage>
                <IonButtons>
                    <BackButton defaultHref="/home" />
                </IonButtons>
            </HeaderWithImage>
            <IonContent>
                <Content>
                    <Title>{trip.title}</Title>
                </Content>
                <Content>
                    <p>{trip.description}</p>
                </Content>
                <Content>
                    <h2>Severdigheter</h2>
                </Content>
                
                {content}
                
            </IonContent>
        </IonPage>
    )
}

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