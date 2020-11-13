import ITrip from "../../models/ITrip";
import React from 'react'
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonSlide } from "@ionic/react";
import Trip from "../Trip";
import styled from "styled-components";


interface MASlideTrips {
    trips: ITrip[]
}

const MASlideTrips = ({trips} : MASlideTrips) => {
    return (
        <IonSlide>
            <IonInfiniteScroll>
                <IonInfiniteScrollContent>
                    {trips.map(trip => <Wrapper key={trip.id}><Trip {...trip} /></Wrapper>)}
                </IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonSlide>
    )
}

const Wrapper = styled.div`
    margin-top: 1rem;
`;

export default MASlideTrips;