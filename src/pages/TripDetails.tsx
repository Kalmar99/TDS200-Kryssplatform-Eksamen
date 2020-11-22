import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonItemGroup, IonModal, IonPage, IonSpinner, IonText, IonToolbar } from '@ionic/react';
import React, { useState } from 'react'
import ITrip from '../models/ITrip'
import ISection from '../models/ISection'
import {arrowBack, mapOutline} from 'ionicons/icons'
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/client';
import Trip from '../components/Trip';
import {config} from '../utils/nhost-config'
import { Link } from 'react-router-dom';
import CommentSection from '../components/Reviews';
import IComment from '../models/IReview';
import Reviews from '../components/Reviews';
import { Point } from '../components/Maps/Map';
import MapStyle from '../components/Maps/MapStyle';
import Map from '../components/Maps/Map'

interface ISectionResponse {
    sections: ISection[];
    reviews: IComment[]
}

const TripDetails = ( props : any  ) => {
    
    /* This way of obtaining the trip object is copied from lecture 3 */
    const [trip,setTrip] = useState<ITrip>(props.location?.state?.trip)

    const FETCH_SECTIONS = gql`
        query fetchSection($userID: Int) {
            sections(where: {trip_id: {_eq: $userID}}) {
                trip_id
                title
                image_name
                id
                description
            }
            reviews(where: {trip_id: {_eq: $userID}}) {
                comment
                id
                rating
                user {
                    display_name
                    avatar_url
                }
            }
        }
    `;

    const {data, loading} = useQuery<ISectionResponse>(FETCH_SECTIONS,{
        variables: {
            userID: trip.id
        }
    })

    let content;

    if (loading) {
        content =  <IonSpinner style={{margin: 'auto'}} name="circles" />
    } else {
        content = data?.sections.map((section,i) => <Trip key={i} id={i} title = {section.title} description={section.description} image_filename={section.image_name}  />)
    }

    const [route,setRoute] = useState<Point[]>([{lat: 58.8693, lng: 9.41494}])
    const [mapDetail,setMapDetail] = useState(false)

    const addToRoute = (point: Point) => {
        setRoute(oldRoute => [...oldRoute, point])
      }
    
      const removeFromRoute = (index : number) => {
        setRoute(oldRoute => {
          oldRoute.splice(index,1)
          return oldRoute
        })
      }

    let routes : Point[] = []
    if(trip.cords != undefined) {

        let array = JSON.parse(trip.cords)
        routes = array;

    }
    

    const MapOptions = {
        container: {
            width: '20rem',
            height: '20rem'
        },
        startCenter: routes[0],
        route: routes,
        options: {
            styles: MapStyle,
            disableDefaultUI: true,
            zoomControl: true
        },
        updateRoute: () => 0,
        allowEdit: false,
        zoom: 16
    }
    
    return (
        <IonPage>
            <IonModal isOpen={mapDetail}>
                <IonHeader>
                    <IonToolbar>
                        <IonIcon slot='start' style={{marginTop: '0.5rem', marginLeft: '0.5rem', }} size='large' icon={mapOutline}/>
                        <h2 style={{marginLeft: '0.5rem'}} slot='start'>Kartvisning</h2>
                        <CloseTxt slot='end' onClick={() => setMapDetail(false)}>Lukk</CloseTxt>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Map {...MapOptions}  container={{width: '100%', height: '90vh'}} />
                </IonContent>
            </IonModal>
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
                   { data != undefined && data.sections.length > 0 && <h2>Aktiviteter</h2>}
                </Content>
                {content}
                <Content>
                    {  routes.length > 0 && <h2>Turens lokasjon</h2>}
                </Content>
                { routes.length > 0 && <Content onClick={() => setMapDetail(true)}>
                   <div style={{width: '20rem',margin: 'auto'}}> <Map {...MapOptions}  /> </div>
                </Content>}
                <Content>
                    <h2>Anmeldelser</h2>
                </Content>
                <Content>
                    <Reviews reviews={data?.reviews} trip={trip.id} />
                </Content>
                <Content>
                    <div style={{height: '5rem'}}></div>
                </Content>
            </IonContent>
        </IonPage>
    )
}

const CloseTxt = styled.p`
    color: #3686E2;
    padding: 0.2rem;
`;

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