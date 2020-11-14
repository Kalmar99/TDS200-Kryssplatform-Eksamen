import ITrip from "../../models/ITrip";
import React from 'react'
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonSlide, IonTitle } from "@ionic/react";
import Trip from "../Trip";
import styled from "styled-components";


interface MASlideTrips {
    trips?: ITrip[]
}

const MASlideTrips = ({trips} : MASlideTrips) => {


    if(trips?.length == 0) {
        return <IonSlide><p>Ingen turer å vise</p></IonSlide>
    }

    return (
        <IonSlide>
            <IonInfiniteScroll>
                <IonInfiniteScrollContent>
                    {trips != undefined && trips.map(trip => <Wrapper key={trip.id}><Trip {...trip} /></Wrapper>)}
                </IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonSlide>
    )
}

const Wrapper = styled.div`
    margin-top: 1rem;
`;

export default MASlideTrips;